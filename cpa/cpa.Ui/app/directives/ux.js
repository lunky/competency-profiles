//ui
'use strict';

(function () {
    angular
        .module('CompetencyProfilesDirectives')
		.directive('obsFocus', focusOnRender);

    focusOnRender.$inject = ['$timeout'];

    function focusOnRender($timeout) {
        var directive = {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    element[0].focus();
                });
            }
        };

        return directive;
    }
})(window.angular);