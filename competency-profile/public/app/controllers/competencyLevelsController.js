(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('CompetencyLevelsController', CompetencyLevelsController);

	CompetencyLevelsController.$inject = ['competencyLevelsService', 'toaster'];

	function CompetencyLevelsController(competencyLevelsService, toaster) {

		var vm = this;
		vm.competencyLevels = [];
		vm.originalLevels = [];
		vm.initialize = initialize;
		vm.save = save;

		initialize();

		vm.toggleEdit = function toggleEdit(level) {

			level.edit = !level.edit;

			if (level.edit) {
				vm.originalLevels.push(angular.copy(level));
			} else {

				for (var i = 0; i < vm.originalLevels.length; i++) {
					if (vm.originalLevels[i].levelId == level.levelId) {
						level.minimumScore = vm.originalLevels[i].minimumScore;
						level.minimumGateScore = vm.originalLevels[i].minimumGateScore;
						break;
					}
				}

				vm.originalLevels = vm.originalLevels.filter(function (el) {
					return el.levelId != level.levelId;
				});
			}
		};

		function initialize() {
			competencyLevelsService.getCompetencyLevels().then(function (response) {
				vm.competencyLevels = response.data;
			});
		}

		function save(level) {
			level.edit = false;
			competencyLevelsService.save(level).then(function (response) {
				console.log('service succes:' + response.data);
				toaster.pop('success', 'Save Successful', 'Your competency score has been updated');
				/*
				 * indicate to the user what's happened in the event of a failure
				 *
				 * Save failed -
				 */
			});
		}
	}
})();
