/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";
    
    /* about page  panel active*/
    //Links Add Active Class
    $('#panel-mission').click(function(){
        $('#mission').addClass('active').removeClass('inactive').siblings().removeClass('active').addClass('inactive');
    });
    $('#panel-vision').click(function(){
        $('#vision').addClass('active').removeClass('inactive').siblings().removeClass('active').addClass('inactive');
    });
    $('#panel-values').click(function(){
        $('#values').addClass('active').removeClass('inactive').siblings().removeClass('active').addClass('inactive');
    });
    $('#panel-history').click(function(){
        $('#history').addClass('active').removeClass('inactive').siblings().removeClass('active').addClass('inactive');
    });

	/* global google: false */
	
	/*-------------------------------------------------*/
	/* =  Banner slider
	/*-------------------------------------------------*/
    
    $('.bxslider').bxSlider();

//	var sliderBanner = $('.bxslider');
//	try{		
//		sliderBanner.bxSlider({
//			auto: true,
//			mode: 'vertical'
//		});
//	} catch(err) {
//	}

	/*-------------------------------------------------*/
	/* =  Scroll to TOP
	/*-------------------------------------------------*/

	var scrollTopElem = $('a.go-to-top'),
		htmlBody = $('html, body');


	scrollTopElem.click(function(){
		htmlBody.animate({scrollTop: 0}, 'slow');
		return false;
	});


	/*-------------------------------------------------*/
	/* =  Testimonial
	/*-------------------------------------------------*/
	try{
		var testimUl = $('.testimonial ul');

		testimUl.quovolver({
			transitionSpeed:300,
			autoPlay:true
		});
	}catch(err){
	}

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.projects-container');
		var $filter=$('.filter-items');

		try{
			$container.imagesLoaded( function(){
				$container.show();
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});
			});
		} catch(err) {
		}

		winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').click(function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


		var filterItemA	= $('.filter-items li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});
	/* ---------------------------------------------------------------------- */
	/*	Fancybox
	/* ---------------------------------------------------------------------- */
	var fancyelem = $("a.zoom-image");

	try{
		fancyelem.fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',

			prevEffect : 'elastic',
			nextEffect : 'elastic',

			closeBtn  : false,

			helpers : {
				title : {
					type : 'inside'
				},
				buttons	: {}
			}
		});
	} catch(err) {
	}

	/* ---------------------------------------------------------------------- */
	/*	accordion
	/* ---------------------------------------------------------------------- */
		try {
			var tabContent = $("#tabs");
			tabContent.tabs();
		} catch(err) {

		}

		var acordDivHide = $('.accordion div'),
			acordHeadClick = $('.accordion h2');


		acordDivHide.addClass('hide');

		acordHeadClick.on('click', function() {
			var $this = $(this);
			
			if ( !$this.hasClass('active')) {
			acordHeadClick.removeClass('active');
			$this
				.addClass('active')
				.next()
					.slideDown(300)
					.siblings('.accordion div')
						.slideUp(300);
			}
			else {
				$(this).removeClass('active')
						.next()
						.slideUp(300);
			}
		});

	/*-------------------------------------------------*/
	/* =  blog slider post
	/*-------------------------------------------------*/
	try {

		var blogSlider = $('.flexslider');

		blogSlider.flexslider({
			animation: "fade"
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"52.204914", "lon":"0.121686"}; //Change a map coordinate here!

	try {
		var mapContainer = $('#map');
		mapContainer.gmap3({
			action: 'addMarker',
			marker:{
				options:{
					icon : new google.maps.MarkerImage('images/mapmarker.png')
				}
			},
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 14,
				},
			},
			{action: 'setOptions', args:[{scrollwheel:true}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});


	/* ---------------------------------------------------------------------- */
	/*	NiceScroll code
	/* ---------------------------------------------------------------------- */
	var nicesx = $('body');
	nicesx.niceScroll({touchbehavior:false,cursorcolor:"#315BA6",cursoropacitymax:1,cursorwidth:8});


	/* ---------------------------------------------------------------------- */
	/*	Slitslider
	/* ---------------------------------------------------------------------- */
	try{
		slitslider();
	} catch(err) {
	}
	
	winDow.bind('resize', function(){
		try{
			slitslider();			
		} catch(err) {
		}
	});
});

function slitslider() {
	"use strict";

	var Page = (function() {

			var $navArrows = $( '#nav-arrows' ),
				$nav = $( '#nav-dots > span' ),
				slitslider = $( '#slider' ).slitslider( {
					onBeforeChange : function( slide, pos ) {

						$nav.removeClass( 'nav-dot-current' );
						$nav.eq( pos ).addClass( 'nav-dot-current' );
					}
				} ),
				init = function() {
					initEvents();
				},
				initEvents = function() {
					// add navigation events
					$navArrows.children( ':last' ).on( 'click', function() {
						slitslider.next();
						return false;
					} );
					$navArrows.children( ':first' ).on( 'click', function() {
						slitslider.previous();
						return false;
					} );
					$nav.each( function( i ) {
						$( this ).on( 'click', function() {
							var $dot = $( this );
							if( !slitslider.isActive() ) {
								$nav.removeClass( 'nav-dot-current' );
								$dot.addClass( 'nav-dot-current' );
							}
							slitslider.jump( i + 1 );
							return false;
						} );
					} );
				};
			return { init : init };
		})();
		Page.init();
		/**
		 * Notes: 
		 * 
		 * example how to add items:
		 */
		/*
		var $items  = $('<div class="sl-slide sl-slide-color-2" data-orientation="horizontal" data-slice1-rotation="-5" data-slice2-rotation="10" data-slice1-scale="2" data-slice2-scale="1"><div class="sl-slide-inner bg-1"><div class="sl-deco" data-icon="t"></div><h2>some text</h2><blockquote><p>bla bla</p><cite>Margi Clarke</cite></blockquote></div></div>');
		// call the plugin's add method
		ss.add($items);
		*/
}