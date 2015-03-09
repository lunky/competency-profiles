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
				remember(level);
			} else {
				var prev = recall(level.levelid);
				if (prev != null) {
					level.minimumScore = prev.minimumScore;
					level.minimumGateScore = prev.minimumGateScore;
				}
				unremember(level.levelid);
			}
		};

		function remember(level) {
			vm.originalLevels.push(angular.copy(level));
		}

		function unremember(levelId) {
			vm.originalLevels = vm.originalLevels.filter(function (el) {
				return el.levelId !== levelId;
			});
		}

		function recall(levelId) {
			var level;
			for (var i = 0; i < vm.originalLevels.length; i++) {
				if (vm.originalLevels[i].levelId === level.levelId) {
					level = vm.originalLevels[i];
					break;
				}
			}
			return level;
		}

		function initialize() {
			competencyLevelsService.getCompetencyLevels().then(function (response) {
				vm.competencyLevels = response.data;
			});
		}

		function save(level) {
			level.edit = false;
			competencyLevelsService.save(level).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your competency level changes have been saved.');
				vm.originalLevels = vm.originalLevels.filter(function (el) {
					return el.levelId !== level.levelId;
				});

			}, function (err) {
				toaster.pop('error', 'Save Unsuccessful',
					'An error has occured. Your competency level changes have not been updated');
			});
		}
	}
})();
