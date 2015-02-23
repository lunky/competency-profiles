(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ObjectiveController', ObjectiveController);

	ObjectiveController.$inject = ['objectiveService'];

	function ObjectiveController(objectiveService) {

		var vm = this;
		vm.objectives = [];
		vm.initialize = initialize;
		vm.save = save;
		
		vm.gateLevels =
		[
			{ id: "base", name: "Base" },
			{ id: "intermediate", name: "Intermediate" },
			{ id: "senior", name: "Senior" }
		];

		initialize();

		function initialize() {
			objectiveService.getObjectives().then(function(data) {
				vm.objectives = data.data;
			});
		}

		function save(objective) {
			level.edit = false;
			objectiveService.save(objective).then(function(data) {
				/* 
				 * indicate to the user what's happened 
				 * Save success - 
				 * Save failed - 
				*/ 
			});
		}
	}
})();
