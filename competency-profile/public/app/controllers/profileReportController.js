(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ProfileReportController', ProfileReportController);

	ProfileReportController.$inject = ['$routeParams', 'competencyProfileService', 'competencyLevelsService', 'toaster'];

	function ProfileReportController($routeParams, competencyProfileService, competencyLevelsService, toaster) {
		var vm = this;
		vm.objectives = [];
		vm.username = $routeParams.username;
		vm.nextLevel = 'base';
		vm.showExamples = true;

		initialize();

		vm.toggleExamples = function toggleExamples() {
			vm.showExamples = !vm.showExamples;
		};

		// go get this user and the user document
		function initialize() {

			var levels = competencyLevelsService.getCompetencyLevelLookups();

			competencyProfileService.getObjectivesByUsername(vm.username)
				.then(
					function (response) {
						vm.objectives = response.data;

						if (response.summary.level === 'Consultant') {
							vm.nextLevel = 'intermediate'
						} else if (response.summary.level === 'Intermediate') {
							vm.nextLevel = 'senior'
						} else {
							vm.nextLevel = 'senior'
						}
					},
					function (err) {
						toaster.pop('error', 'Error Retrieving Objectives', err);
					}
				);
		}
	}
})();
