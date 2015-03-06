// common .js
(function (angular) {
    'use strict';
    console.log('consultingCommon');
    angular.module('consultingCommon')
        .value('appEvents', {
            updateLevel: 'updateLevel'
        });
})(window.angular);

// FIX: collapse bootstrap nav on click
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

// TEMP: Temporary script for parallax effect
// TODO: Create angular directive
$(window).scroll(function() {
  var smallLogoHeight = 50;//$('.small-logo').height();
  var bigLogoHeight = $('.big-logo-container').height();
  var navbarHeight = $('.navbar').height(); 
  
  var smallLogoEndPos = 0;
  var smallSpeed = (smallLogoHeight / bigLogoHeight);
  
  var ySmall = ($(window).scrollTop() * smallSpeed); 
  
  var smallPadding = navbarHeight - ySmall;
  if (smallPadding > navbarHeight) { smallPadding = navbarHeight; }
  if (smallPadding < smallLogoEndPos) { smallPadding = smallLogoEndPos; }
  if (smallPadding < 0) { smallPadding = 0; }
  
  $('.small-logo-container ').css({ "padding-top": smallPadding});
  
  var navOpacity = ySmall / smallLogoHeight; 
  if  (navOpacity > 1) { navOpacity = 1; }
  if (navOpacity < 0 ) { navOpacity = 0; }
  
  var shadowOpacity = navOpacity * 0.4;
  if ( ySmall > 1) {
    $('.navbar').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"});
  } else {
    $('.navbar').css({"box-shadow": "none"});
  }
});