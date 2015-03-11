(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('CompetencyProfileController', CompetencyProfileController);

	CompetencyProfileController.$inject = ['$filter', '$scope', '$rootScope',
	'appEvents', 'competencyLevelsService', 'competencyProfileService', 'toaster'];

	function CompetencyProfileController(
		$filter, $scope, $rootScope,
		appEvents, competencyLevelsService, competencyProfileService, toaster) {
		var vm = this;

		vm.clearAll = clearAll;
		vm.competencyLevels = [];
		vm.objectives = [];
		vm.save = save;
		vm.scoreObjective = scoreObjective;

		initialize();

		function clearAll() {
			angular.forEach(vm.objectives, function (objective) {
				objective.isMet = false;
			});
			vm.save();
		}

		function initialize() {
			competencyProfileService.getObjectives().then(function (response) {
				vm.objectives = response.data;
				vm.score = response.summary;
				$rootScope.$broadcast(appEvents.updateLevel, {
					level: vm.score.level
				});
			}, function (err) {
				toaster.pop('error', 'An error occured getting objectives.', err);
			});
		}

		function save() {
			// TODO : filter objectives that have something changed?
			competencyProfileService.save(vm.objectives, vm.score.level).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your competency score has been updated');
				vm.objectives = response.data;
				vm.score = response.summary;
				$rootScope.$broadcast(appEvents.updateLevel, {
					level: vm.score.level
				});
			}, function (err) {
				toaster.pop('error', 'An error occured saving', err);
			});
		}

		function scoreObjective(objective, score) {
			objective.isMet = score;
			vm.save();
		}
	}
})();
