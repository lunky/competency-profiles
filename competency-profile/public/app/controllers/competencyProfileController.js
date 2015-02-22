(function () {
	'use strict';
	
	angular
        .module('consultingControllers')
        .controller('CompetencyProfileController', CompetencyProfileController);
	
	CompetencyProfileController.$inject = ['$filter', 'competencyLevelsService', 'objectivesService', '$routeParams', '$location'];
	
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
				
				//TODO set real scores here
				vm.score = {
					base: 60,
					intermediate: 30,
					senior: 5,
					communication: 70,
					leadership: 55,
					interpersonal: 70,
					conflict: 40,
					citizenship: 50
				};
			});
		}
		
		function save() {
			// TODO : filter objectives that have something changed?
			var objectives = vm.objectives;
			objectivesService.save(objectives).then(function (data) {
				//TODO reset real scores here
				vm.score = {
					base: vm.score.base + 1,
					intermediate: vm.score.intermediate + 1,
					senior: vm.score.senior + 1,
					communication: vm.score.communication + 1,
					leadership: vm.score.leadership + 1,
					interpersonal: vm.score.interpersonal + 1,
					conflict: vm.score.conflict + 1,
					citizenship: vm.score.citizenship + 1
				};
			});
		}
		
		function scoreObjective(objective, score) {
			objective.isMet = score;
			vm.save();
		}
	}
})();
