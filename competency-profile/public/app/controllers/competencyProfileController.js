(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('CompetencyProfileController', CompetencyProfileController);

	CompetencyProfileController.$inject =
			['$filter', 'toaster', 'competencyLevelsService', 'competencyProfileService'];

	function CompetencyProfileController($filter, toaster, competencyLevelsService, competencyProfileService) {
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
			competencyProfileService.getObjectives().then(function (data) {
				var objectives = data.data;
				vm.objectives = objectives;
				vm.score = data.summary;
			});
		}

		function save() {
			// TODO : filter objectives that have something changed?
			var objectives = vm.objectives;
			competencyProfileService.save(objectives).then(function (data) {
				console.log('working?');
				toaster.pop('success', "Save Successful", "Your competency score has been updated");
				vm.objectives = data.data;
				vm.score = data.summary;
			});
		}

		function scoreObjective(objective, score) {
			objective.isMet = score;
			vm.save();
		}
	}
})();
