<?php
/**
 * Jesse_James_Blocks functions
 *
 * @package Jesse_James_Blocks
 */

/**
 * Enqueue React scripts.
 * Includes wp-element dependency. 
 */
 function jesse_james_react_scripts() {

  wp_enqueue_script(
    'jesse-james-react-app', 
    get_stylesheet_directory_uri() . '/build/index.js', 
    array( 'wp-element', 'wp-data' ), // Add 'wp-data' here
    '1.0.0', 
    true 
  );  

  wp_enqueue_style('jesse-james-react-theme-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'jesse_james_react_scripts');


/**
 * Theme constants.
 */
define('JESSE_JAMES_BLOCKS_VERSION', '1.0.0');

/**
 * Add custom blocks for gutenberg
 */
// require get_stylesheet_directory() . '/assets/blocks/blocks.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_block_jesse_james_block_plugin_scaffold() {

  $block_dir = get_stylesheet_directory() . '/assets/blocks/';
  $block_jess_block_plugin_scaffold_experiments = $block_dir . '/jesse-james-wp-block-plugin-scaffold/jess-block-scaffold-experiments.php';

//  echo " TEST-1:" . $block_dir ;
//  echo " TEST-2:" . is_dir( $block_dir )  ;
//	register_block_type( __DIR__ . '/build' );

//  register_block_type( $block_dir );

 include_once( $block_jess_block_plugin_scaffold_experiments );

}
add_action( 'init', 'register_block_jesse_james_block_plugin_scaffold' );



/**
 * Add pre-styles.css - for resets, etc.
 */
add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style( 'jess-blocks-child-pre-style', get_stylesheet_directory_uri() . '/assets/css/pre-style.css' );
});

/**
 * Add Child styles.css
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'jess-blocks-child-style', get_stylesheet_directory_uri() . '/style.css' );
});


/**
 * Enqueue a script
 */
function jesse_james_enqueue_scripts() {
    wp_enqueue_script( 'jesse-james-js', get_stylesheet_directory_uri() . '/assets/js/jesse_james.js', array(), true );
}
add_action( 'wp_enqueue_scripts', 'jesse_james_enqueue_scripts' );

/**
 * Theme scripts and styles.
 */
function jesse_james_blocks_scripts() {
	wp_enqueue_style(
		'go-child-style',
		get_stylesheet_uri(),
		array( 'jesse_james_blocks-style' ),
		JESSE_JAMES_BLOCKS_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'jesse_james_blocks_scripts' );

// Allow SVG
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

    global $wp_version;
    if ( $wp_version !== '4.7.1' ) {
       return $data;
    }
  
    $filetype = wp_check_filetype( $filename, $mimes );
  
    return [
        'ext'             => $filetype['ext'],
        'type'            => $filetype['type'],
        'proper_filename' => $data['proper_filename']
    ];
  
  }, 10, 4 );
  
  function cc_mime_types( $mimes ){
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }
  add_filter( 'upload_mimes', 'cc_mime_types' );
  
  function fix_svg() {
    echo '<style type="text/css">
          .attachment-266x266, .thumbnail img {
               width: 100% !important;
               height: auto !important;
          }
          </style>';
  }
  add_action( 'admin_head', 'fix_svg' );


function jj_svg_urlencode( $svg_path ) {
	$data = file_get_contents( $svg_path );
		// $data = preg_replace('/\v(?:[\v\h]+)/', ' ', $data);
		$data  = str_replace( '"', "'", $data );
		$trans = [
			'<' => '%3c',
			'>' => '%3e',
			'#' => '%23',
		];
		$data  = strtr( $data, $trans );
		// $data = rawurlencode($data);
		// re-decode a few characters understood by browsers to improve compression
		return $data;
}//end jessejames_svg_urlencode()

// echo jj_svg_urlencode( './Logo-Planck-full.svg');

add_shortcode('category_tags_list', 'get_tags_by_shared_category_shortcode');

function get_tags_by_shared_category_shortcode($atts) {
  // Extract category slug from shortcode attribute (if provided)
  $category_slug = isset($atts['category']) ? $atts['category'] : '';

  // Check if category slug is provided
  if (!$category_slug) {
    return 'Please specify the category slug using the "category" attribute.';
  }

  // Set up the query arguments
  $args = array(
    'category_name' => $category_slug,
    'posts_per_page' => -1, // Get all posts in the category
  );

  // Run the query
  $query = new WP_Query($args);

  // Initialize variables
  $tags = array();

  // Check if posts were found
  if ($query->have_posts()) {
    // Loop through each post
    while ($query->have_posts()) {
      $query->the_post();

      // Get all tags for the current post
      $post_tags = get_the_tags();

      // Loop through each post tag
      if ($post_tags) {
        foreach ($post_tags as $tag) {
          $tag_id = $tag->term_id;
          $tag_slug = $tag->slug;
          $tag_name = $tag->name;

          // Check if tag already exists in the list
          if (!isset($tags[$tag_id])) {
            $tags[$tag_id] = array(
              'name' => $tag_name,
              'url' => get_tag_link($tag_id),
              'count' => 0,
            );
          }

          // Increment the count for the existing tag
          $tags[$tag_id]['count']++;
        }
      }
    }
  }

  // Reset post data to avoid conflicts
  wp_reset_postdata();

  // Build the output (if tags are found)
  $output = '';
  if ($tags) {
    $output .= '<ul>';
    foreach ($tags as $tag) {
      $output .= '<li><a href="' . $tag['url'] . '">' . $tag['name'] . ' (' . $tag['count'] . ')</a></li>';
    }
    $output .= '</ul>';
  } else {
    $output .= 'No tags found for this category.';
  }

  // Return the output
  return $output;
}

