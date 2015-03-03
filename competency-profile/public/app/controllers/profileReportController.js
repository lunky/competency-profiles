(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ProfileReportController', ProfileReportController);

	ProfileReportController.$inject = ['$routeParams', 'competencyProfileService', 'toaster'];

	function ProfileReportController($routeParams, competencyProfileService, toaster) {
		var vm = this;
		vm.objectives = [];
		vm.username = $routeParams.username;

		initialize();

		// go get this user and the user document
		function initialize() {
			competencyProfileService.getObjectivesByUsername(vm.username)
				.then(
					function (response) {
						vm.objectives = response.data;
					},
					function (err) {
						toaster.pop('error', 'Error Retrieving Objectives', err);
					}
				);
		}
	}
})();
