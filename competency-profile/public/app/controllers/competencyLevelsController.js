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
			
			/*cancelling the edit doesn't reset the data - do we want that?
			 * we probably want to only get the level being edited (not the entire collection) 
			 * TODO: create route to return single comeptencylevel rather than the list
			 *		if(!level.edit){
			 * 			competencyLevelsService.getCompetencyLevels().then(function (data) {
			 * 				for (var i = 0; i < data.data.length; i++) {
			 * 					if (data.data[i]._id == level._id)
			 * 						level.minimumScore = data.data[i].minimumScore;
			 * 						level.minimumGateScore = data.data[i].minimumGateScore;
			 * 				}
			 *		}
			 */
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
