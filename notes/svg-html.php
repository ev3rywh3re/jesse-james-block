<?php

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

echo jj_svg_urlencode( './Logo-Planck-full.svg');
