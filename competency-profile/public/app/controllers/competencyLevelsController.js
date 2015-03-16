(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('CompetencyLevelsController', CompetencyLevelsController);

	CompetencyLevelsController.$inject = ['competencyLevelsService', 'toaster'];

	function CompetencyLevelsController(competencyLevelsService, toaster) {

		var vm = this;
		vm.initialize = initialize;
		vm.save = save;

		initialize();

		function initialize() {
			competencyLevelsService.getCompetencyLevels().then(function (response) {
				vm.competencyLevels = response.data;
			}, function (err) {
				toaster.pop('error', 'Save Unsuccessful',
					'An error has occured. Your competency level changes have not been updated');
			});
		}

		function save(level) {
			competencyLevelsService.save(level).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your competency level changes have been saved.');
			}, function (err) {
				toaster.pop('error', 'Save Unsuccessful',
					'An error has occured. Your competency level changes have not been updated');
			});
		}
	}
})();
