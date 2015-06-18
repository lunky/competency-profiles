(function () {
    'use strict';

    angular
		.module('CompetencyProfilesControllers')
		.controller('NavController', NavController);

    NavController.$inject = ['$location', 'userAccessService', 'toaster'];

    function NavController($location, userAccessService, toaster) {
        var vm = this;
        vm.isCollapsed = true;

        vm.getClass = function (path) {
            if ($location.path() === path) {
                return 'active';
            } else {
                return '';
            }
        };

        function getUserAccess() {
            userAccessService.getUserAccess()
            .then(function (response) {
                vm.isCm = response.isCareerMentor;
                vm.isCpAdmin = response.isCpAdmin;
            },
                function (err) {
                    toaster.pop('error', 'An error occured calling UserAccess method.', err);
                });
        }

        getUserAccess();
    }
})(window.angular);
