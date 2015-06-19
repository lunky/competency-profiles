(function () {
    'use strict';

    angular
		.module('CompetencyProfilesControllers')
		.controller('TeamMembersController', TeamMembersController);

    TeamMembersController.$inject = ['teamMembersService', 'toaster'];

    function TeamMembersController(teamMembersService, toaster) {
        var vm = this;
        vm.teamMembers = [];

        initialize();

        function initialize() {
            teamMembersService.getTeamMembers().then(function (response) {
                vm.teamMembers = response;
            },
				function (err) {
				    toaster.pop('error', 'Error loading Team members', err);
				}
			);
        }
    }
})();
