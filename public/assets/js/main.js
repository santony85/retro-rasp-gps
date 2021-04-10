/*
	Overflow by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
var socket = io();

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {
			parallax: true,
			parallaxFactor: 10
		};

	// Breakpoints.
		breakpoints({
			wide:    [ '1081px',  '1680px' ],
			normal:  [ '841px',   '1080px' ],
			narrow:  [ '737px',   '840px'  ],
			mobile:  [ null,      '736px'  ]
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-scroll');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly-middle').scrolly({
			speed: 1000,
			anchor: 'middle'
		});

		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() { return (breakpoints.active('<=mobile') ? 70 : 190); }
		});

	// Parallax background.

		// Disable parallax on IE/Edge (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.overflow_parallax', function() {

					// Adjust background position.
						$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.overflow_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
						if (breakpoints.active('<=narrow')) {

							$body.css('background-position', '');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.overflow_parallax');

				})
				.trigger('resize.overflow_parallax');

		}

	// Poptrox.
		$('.gallery').poptrox({
			useBodyOverflow: false,
			usePopupEasyClose: false,
			overlayColor: '#0a1919',
			overlayOpacity: 0.75,
			usePopupDefaultStyling: false,
			usePopupCaption: true,
			popupLoaderText: '',
			windowMargin: 10,
			usePopupNav: true
		});

})(jQuery);

var i = 0;

function move(dir,temps) {
	if (i == 0) {
		i = 1;
		var elem = document.getElementById("myBar");
		var width = 1;
		var id = setInterval(frame, temps);
		function frame() {
			if (width > 99) {
				clearInterval(id);
				i = 0;
				if(dir==1)window.location.href = '/'
				else if(dir==2)window.location.href = '/continu'
			} else {
				width++;
				elem.style.width = width + "%";
			}
		}
	}
}

socket.on('cellbouteille', function(msg){
	if(msg=="on") window.location.href = '/qrcode'
	if(msg=="off") window.location.href = '/alert'
});

socket.on('findistrib', function(msg){
	if(msg=="off") window.location.href = '/'
});

socket.on('getflow', function(msg){
	var elem = document.getElementById("myBar");
	elem.style.width = msg + "%";
	var elem2 = document.getElementById("myBar");
	elem2.innerHTML = msg + "%";
});

socket.on('finflow', function(msg){
	window.location.href = '/continu'
});
socket.on('afflog', function(msg){
	window.location.href = '/logs'
});


socket.on('choix', function(msg){
	//if(msg=="")window.location.href = '/distri/'+msg;
	if(msg=="choixga")window.location.href = '/';
	else window.location.href = '/'+msg;

});



socket.on('finbt', function(msg){
	window.location.href = '/getout';
});