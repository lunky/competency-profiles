(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ObjectiveController', ObjectiveController);

	ObjectiveController.$inject = ['objectiveService', 'toaster'];

	function ObjectiveController(objectiveService, toaster) {

		var vm = this;
		vm.objectives = [];
		vm.initialize = initialize;
		vm.save = save;
		
		vm.gateLevels =
		[
			{ id: 'base', name: '"Base' },
			{ id: 'intermediate', name: 'Intermediate' },
			{ id: 'senior', name: 'Senior' }
		];

		initialize();

		function initialize() {
			objectiveService.getObjectives().then(function(response) {
				vm.objectives = response.data;
			});
		}

		function save(objective) {
			level.edit = false;
			objectiveService.save(objective).then(function(response) {
				/* 
				 * indicate to the user what's happened 
				 * Save success - 
				 * Save failed - 
				*/ 
			});
		}
	}
})();
