'use strict';

// Remember we are playing with separate loading behaviors.

window.addEventListener("load", function(event) {
	//do work
/*
	window.scrollTo({
	  top: 100,
	  behavior: 'smooth'
	});
*/
	var go_y = window.scrollY
	console.log(go_y);
});

document.addEventListener( 'DOMContentLoaded', function( event ) {
	//do work
	const stg_ms_header = document.querySelector(".stg-multisite-header-");
	const stg_ms_header_height = stg_ms_header.offsetHeight;
	const WinBody = document.body;
	WinBody.style.paddingTop = stg_ms_header_height + 'px';

	window.addEventListener( 'scroll', function() {
		//do work
		const WinTop = window.pageYOffset || document.documentElement.scrollTop;
		const WinLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const CalcRotate = WinTop / 10 % Math.PI;
		const stg_ms_header = document.querySelector(".stg-multisite-header-");
		//old const stg_ms_header = document.getElementById( 'site-header' );
		const LogoContainer = document.querySelector(".stg-logo-svg");
		//old const LogoContainer = document.getElementById( 'custom-logo-link' );
		const WinBody = document.body;

		if ( 1 < WinTop ) {
			stg_ms_header.classList.add( 'site-header-fixed-' );
			LogoContainer.style.transform = 'rotate(' + CalcRotate + 'rad)';
		} else {
			stg_ms_header.classList.remove( 'site-header-fixed-' );
			//WinBody.style.paddingTop = '0px';
		}
		//console.log( 'Horizontally: ' + WinLeft + 'px<br>Vertically: ' + WinTop + 'px' );
		//console.log( LogoContainer.style.transform );

	});

});
