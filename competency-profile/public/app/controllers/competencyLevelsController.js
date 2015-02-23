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

		function initialize() {
			competencyLevelsService.getCompetencyLevels().then(function(data) {
				vm.competencyLevels = data.data;
			});
		}

		function save(level) {
			level.edit = false;
			competencyLevelsService.save(level).then(function(data) {
				//nothing?
			});
		}
	}
})();
