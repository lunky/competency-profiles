(function () {
	'use strict';
	
	angular
		.module('consultingControllers')
		.controller('ObjectiveAdminController', ObjectiveAdminController);
	
	ObjectiveAdminController.$inject = ['competencyLevelsService', 'objectiveAdminService', 'toaster'];
	
	function ObjectiveAdminController(competencyLevelsService, objectiveAdminService, toaster) {
		
		var vm = this;
		vm.objectives = [];
		vm.originalObjectives = [];
		vm.gateLevels = [];
		vm.initialize = initialize;
		vm.save = save;
		
		initialize();
		
		vm.toggleEdit = function toggleEdit(objective) {
			
			objective.edit = !objective.edit;
			
			if (objective.edit) {
				vm.originalObjectives.push(angular.copy(objective));
			} else {
				
				for (var i = 0; i < vm.originalObjectives.length; i++) {
					if (vm.originalObjectives[i].objectiveId == objective.objectiveId) {
						objective.description = vm.originalObjectives[i].description;
						objective.supportingExample = vm.originalObjectives[i].supportingExample;
						objective.counterExample = vm.originalObjectives[i].counterExample;
						objective.gateLevel = vm.originalObjectives[i].gateLevel;
						objective.score = vm.originalObjectives[i].score;
						objective.communication = vm.originalObjectives[i].communication;
						objective.leadership = vm.originalObjectives[i].leadership;
						objective.interpersonal = vm.originalObjectives[i].interpersonal;
						objective.conflict = vm.originalObjectives[i].conflict;
						objective.citizenship = vm.originalObjectives[i].citizenship;
						break;
					}
				}
				
				vm.originalObjectives = vm.originalObjectives.filter(function (el) {
					return el.objectiveId != objectiveId.objectiveId;
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
