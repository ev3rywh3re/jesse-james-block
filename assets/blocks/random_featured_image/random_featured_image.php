<?php
/**
 * Plugin Name: Random Featured Image Block
 * Plugin URI:  
 * Description: A WordPress block that displays a random featured image from a specified category, linked to the post.
 * Version:     1.0.0
 * Author:      Bard
 * Author URI:  
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: random-featured-image-block
 */

// Register custom block type
function register_random_featured_image_block() {
	register_block_type(
	  'my-plugin/random-featured-image',
	  array(
		'render_callback' => 'render_random_featured_image_block',
		'attributes' => array(
		  'category' => array(
			'type' => 'string',
			'source' => 'attribute',
			'selector' => '.category-select',
		  ),
		),
		'edit' => function ($props) {
		  return  '
			<div>
			  <SelectControl
				label="Category"
				value={' . $props['attributes']['category'] . '}
				onChange={(value) => {
				  ' . $props['setAttributes'] . "(['category' => value]);
				}}
				options={' . get_categories_for_dropdown() . '}
			  />
			</div>";
		},
	  )
	);
  }
add_action('init', 'register_random_featured_image_block');

// Get categories for the dropdown in the block editor
function get_categories_for_dropdown() {
  // Fetch all categories
  $categories = get_categories();

  // Format categories for the dropdown
  $options = array_map(function ($category) {
    return array(
      'value' => $category->slug,
      'label' => $category->name,
    );
  }, $categories);

  // Log categories to the browser console
  console_log('Categories:', $options);

  // Return the formatted category options
  return $options;
}

// Render the random featured image block
function render_random_featured_image_block($attributes) {
  // Get the category slug from the block attributes
  $category_slug = $attributes['category'];

  // Query for posts with featured images in the specified category
  $args = array(
    'post_type' => 'post',
    'category_name' => $category_slug,
    'posts_per_page' => -1, // Get all posts
    'meta_key' => '_thumbnail_id', // Ensure posts have featured images
    'orderby' => 'rand', // Randomize the post selection
  );
  $query = new WP_Query($args);

  // Log query arguments to the browser console
  console_log('Query Arguments:', $args);

  // Check if a post was found
  if ($query->have_posts()) {
    $query->the_post();

    // Get the featured image URL
    $featured_image_url = get_the_post_thumbnail_url(get_the_ID(), 'full');

    // Log featured image URL to the browser console
    console_log('Featured Image URL:', $featured_image_url);

    // Return the HTML for the featured image, linked to the post
    return '<a href="' . get_permalink() . '"><img src="' . esc_url($featured_image_url) . '" alt="' . esc_attr(get_the_title()) . '">' . get_the_title() . '</a>';
  } else {
    // Return a message if no posts were found
    return 'No posts found in the specified category with featured images.';
  }

  // Reset post data
  wp_reset_postdata();
}

// Echo the JavaScript code in the wp_footer
// add_action('wp_footer', 'echo_block_js');
add_action('admin_footer', 'echo_block_js');

function echo_block_js() {
  ?>
  <script>
    (function(blocks, components, element, i18n, editor) {
      var __ = i18n.__;
      var el = element.createElement;
      var Fragment = element.Fragment;
      var registerBlockType = blocks.registerBlockType;
      var SelectControl = components.SelectControl;

      registerBlockType('my-plugin/random-featured-image', {
        title: __('Random Featured Image', 'random-featured-image-block'),
        description: __('Displays a random featured image from a specified category, linked to the post.', 'random-featured-image-block'),
        icon: 'images-alt2',
        category: 'common',
        attributes: {
          category: {
            type: 'string',
            source: 'attribute',
            selector: '.category-select',
          },
        },
        edit: function(props) {
          return (
            <div>
              <SelectControl
                label={__('Category', 'random-featured-image-block')}
                value={props.attributes.category}
                onChange={(value) => {
                  props.setAttributes({ category: value });
                }}
                options={getCategoriesForDropdown()}
              />
            </div>
          );
        },
        save: function(props) {
          return null; // Render the block on the frontend using the render_callback
        },
      });

      function getCategoriesForDropdown() {
        // Fetch categories from WordPress API
        // ... (Implementation for fetching categories)
      }
    })(
      window.wp.blocks,
      window.wp.components,
      window.wp.element,
      window.wp.i18n,
      window.wp.editor
    );
  </script>
  <?php
}

// Helper function to log to the browser console
function console_log($output, $with_script_tags = true) {
  $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT) . ');';
  if ($with_script_tags) {
    $js_code = '<script>' . $js_code . '</script>';
  }
  echo $js_code;
}

function getCategoriesForDropdown() {
	$response = wp_remote_get( rest_url( '/wp/v2/categories' ) );
	if ( is_wp_error( $response ) ) {
	  return array(); // Return an empty array if there's an error
	}
	$categories = json_decode( wp_remote_retrieve_body( $response ) );
	$options = array_map(function ($category) {
	  return array(
		'value' => $category->slug,
		'label' => $category->name,
	  );
	}, $categories);
	return $options;
  }
  
