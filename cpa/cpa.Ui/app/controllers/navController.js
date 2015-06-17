(function () {
    'use strict';

    angular
		.module('CompetencyProfilesControllers')
		.controller('NavController', NavController);

    NavController.$inject = ['$location', 'userAccessService', 'toaster'];

    function NavController($location, userAccessService, toaster) {
        var vm = this;
        vm.isCollapsed = true;

        vm.getClass = function(path) {
            if ($location.path() === path) {
                return 'active';
            } else {
                return '';
            }
        };

        vm.isCm = userAccessService.isCareerMentor()
            .then(function(response) {
                    vm.isCm = response;
                },
                function(err) {
                    toaster.pop('error', 'An error occured calling IsCareerMentor.', err);
                });

        vm.isCpAdmin = userAccessService.isCpAdmin()
            .then(function(response) {
                vm.isCpAdmin = response;
                },
                function(err) {
                    toaster.pop('error', 'An error occured calling IsCpAdmin.', err);
                });
    }
})(window.angular);
