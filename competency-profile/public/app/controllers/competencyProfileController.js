(function () {
	'use strict';

	angular
				.module('consultingControllers')
				.controller('CompetencyProfileController', CompetencyProfileController);

	CompetencyProfileController.$inject =
			['$filter', 'competencyLevelsService', 'objectivesService', '$routeParams', '$location'];

	function CompetencyProfileController($filter, competencyLevelsService, objectivesService, $routeParams, $location) {
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
				vm.save();
			});
		}

		function initialize() {
			objectivesService.getObjectives().then(function (data) {
				var objectives = data.data;
				vm.objectives = objectives;
				vm.score = data.summary;
			});
		}

		function save() {
			// TODO : filter objectives that have something changed?
			var objectives = vm.objectives;
			objectivesService.save(objectives).then(function (data) {
				var objectives = data.data;
				vm.score = data.summary;
			});
		}

		function scoreObjective(objective, score) {
			objective.isMet = score;
			vm.save();
		}
	}
})();
