(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('ProfileReportController', ProfileReportController);

	ProfileReportController.$inject = ['$filter', '$routeParams',
									'competencyProfileService', 'competencyLevelsService', 'toaster'];

	function ProfileReportController($filter, $routeParams, competencyProfileService,
		competencyLevelsService, toaster) {
		var vm = this;

		vm.profile = {};
		vm.username = $routeParams.username;
		vm.showExamples = false;
		vm.gateFilter = {};
		vm.scoreFilter = {};
		vm.showExamples = false;
		vm.showRequiredExamples = false;
		vm.toggleExamples = toggleExamples;
		vm.toggleRequiredExamples = toggleRequiredExamples;

		initialize();

		// go get this user and the user document
		function initialize() {

			var levels = competencyLevelsService.getCompetencyLevelLookups();

			competencyProfileService.getObjectivesByUsername(vm.username)
				.then(
					function (response) {
						vm.profile = response;
						vm.personal = response.personal;
						vm.gateFilter = {
							isMet: false,
							gateLevel: response.summary.nextLevel
						};

						vm.scoreFilter = {
							isMet: false,
							gateLevel: '!' + response.summary.nextLevel
						};
					},
					function (err) {
						toaster.pop('error', 'Error Retrieving Objectives', err);
					}
				);
		}

		function toggleExamples() {
			var objectives = $filter('filter')(vm.profile.data, vm.scoreFilter);

			angular.forEach(objectives, function (objective) {
				objective.open = vm.showExamples;
			});
		}

		function toggleRequiredExamples() {
			var objectives = $filter('filter')(vm.profile.data, vm.gateFilter);

			angular.forEach(objectives, function (objective) {
				objective.open = vm.showRequiredExamples;
			});
		}
	}
})();
