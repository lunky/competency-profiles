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