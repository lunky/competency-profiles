(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ProfileReportController', ProfileReportController);

	ProfileReportController.$inject = ['$routeParams', 'competencyProfileService', 'competencyLevelsService', 'toaster'];

	function ProfileReportController($routeParams, competencyProfileService, competencyLevelsService, toaster) {
		var vm = this;

		vm.profile = {};
		vm.username = $routeParams.username;
		vm.showExamples = false;
		vm.gateFilter = {};
		vm.scoreFilter = {};

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
						vm.profile = response;

						vm.gateFilter = {
							isMet: false,
							gateLevel: response.summary.nextLevel
						};

						vm.scoreFilter = {
							isMet: false,
							gateLevel: "!" + response.summary.nextLevel
						};
					},
					function (err) {
						toaster.pop('error', 'Error Retrieving Objectives', err);
					}
				);
		}
	}
})();