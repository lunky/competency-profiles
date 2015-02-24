(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('CompetencyLevelsController', CompetencyLevelsController);

	CompetencyLevelsController.$inject = ['competencyLevelsService'];

	function CompetencyLevelsController(competencyLevelsService) {

		var vm = this;
		vm.competencyLevels = [];
		vm.initialize = initialize;
		vm.save = save;

		initialize();

		vm.toggleEdit = function toggleEdit(level) {
			level.edit = !level.edit;
			// TODO: replace with objectId route
			if(!level.edit) {
				competencyLevelsService.getCompetencyLevel(level.levelId).then(function(data) {
					level.minimumScore = data.data.minimumScore;
					level.minimumGateScore = data.data.minimumGateScore;
				});
			}
		};

		function initialize() {
			competencyLevelsService.getCompetencyLevels().then(function(data) {
				vm.competencyLevels = data.data;
			});
		}
		
		function save(level) {
			level.edit = false;
			competencyLevelsService.save(level).then(function(data) {
				/* 
				 * indicate to the user what's happened 
				 * Save success - 
				 * Save failed - 
				*/ 
			});
		}
	}
})();
