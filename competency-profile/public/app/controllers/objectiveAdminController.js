(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ObjectiveAdminController', ObjectiveAdminController);

	ObjectiveAdminController.$inject = ['competencyLevelsService', 'objectiveAdminService', 'toaster'];

	function ObjectiveAdminController(competencyLevelsService, objectiveAdminService, toaster) {

		var vm = this;
		vm.objectives = [];
		vm.gateLevels = [];
		vm.initialize = initialize;
		vm.save = save;

		initialize();

		vm.toggleEdit = function toggleEdit(objective) {
			objective.edit = !objective.edit;
			if (!objective.edit) {
				objectiveAdminService.get(objective._id).then(function (response) {
					//reset form data
					objective.description = response.data.description;
					objective.supportingExample = response.data.supportingExample;
					objective.counterExample = response.data.counterExample;
					objective.gateLevel = response.data.gateLevel;
					objective.score = response.data.score;
					objective.communication = response.data.communication;
					objective.leadership = response.data.leadership;
					objective.interpersonal = response.data.interpersonal;
					objective.conflict = response.data.conflict;
					objective.citizenship = response.data.citizenship;
				});
			}
		};

		function initialize() {
			console.log('Objectives admin initialize started');

			//todo handle failures
			objectiveAdminService.getObjectives().then(function (response) {
				vm.objectives = response.data;
			});

			competencyLevelsService.getCompetencyLevelLookups().then(function (response) {
				vm.gateLevels = response.data
			});

			console.log('Objectives admin initialize completed');
		}

		function save(objective) {
			objective.edit = false;
			objectiveAdminService.save(objective).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your objective metadata was updated');
			});
		}
	}
})();
