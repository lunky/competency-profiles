(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ObjectivesController', ObjectivesController);

	ObjectivesController.$inject = ['objectiveService', 'toaster'];

	function ObjectivesController(objectiveService, toaster) {

		var vm = this;
		vm.objectives = [];
		vm.initialize = initialize;
		vm.save = save;
		
		vm.gateLevels =
		[
			{ id: 'base', label: 'Base' },
			{ id: 'intermediate', label: 'Intermediate' },
			{ id: 'senior', label: 'Senior' }
		];

		initialize();

		function initialize() {
            console.log('Objectives admin initialize started');
            
			objectiveService.get().then(function(response) {
				vm.objectives = response.data;
			});
            
            console.log('Objectives admin initialize completed');
		}

		function save(objective) {
			level.edit = false;
			objectiveService.save(objective).then(function(response) {
				toaster.pop('success', 'Save Successful', 'Your objective metadata was updated');
			});
		}
	}
})();
