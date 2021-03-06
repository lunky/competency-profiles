(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('CompetencyProfileController', CompetencyProfileController);

	CompetencyProfileController.$inject = ['$filter', '$scope', '$rootScope',
	'appEvents', 'competencyLevelsService', 'competencyProfileService', 'toaster'];

	function CompetencyProfileController(
		$filter, $scope, $rootScope,
		appEvents, competencyLevelsService, competencyProfileService, toaster) {
		var vm = this;

		vm.clearAll = clearAll;
		vm.competencyLevels = [];
		vm.objectives = [];
		vm.save = save;
		vm.scoreObjective = scoreObjective;

		vm.pieData = [['', '']]; // need 2d array
		vm.pieChart = {};
		vm.pieChart.type = 'PieChart';
		vm.pieChart.data = vm.pieData;
		vm.pieChart.options = {
			displayExactValues: true,
			is3D: true,
			legend: {
				position: 'top',
				maxLines: 7
			}
		};

		initialize();

		function bindScore() {
			vm.pieData = [
				['competency', 'score'],
				['Communications', vm.score.communicationAnswered],
				['Leadership', vm.score.leadershipAnswered],
				['Interpersonal', vm.score.interpersonalAnswered],
				['Conflict', vm.score.conflictAnswered],
				['Citizenship', vm.score.citizenshipAnswered]
			];

			var total = vm.pieData.reduce(function (prev, curr, index, arr) {
				if (index === 1) {
					return curr[1];
				}
				return prev + curr[1];
			});
			if (total === 0) {
				vm.pieData = [
					['competency', 'score'],
					['No Data', 100]
				];
			}
			vm.pieChart.data = vm.pieData;
		}

		function clearAll() {
			angular.forEach(vm.objectives, function (objective) {
				objective.isMet = false;
				objective.skipped = false;
			});
			vm.save();
		}

		function initializeSkipped() {
			vm.objectives.map(function (el) {
				el.skipped = false;
			});
		}

		function initialize() {
			competencyProfileService.getObjectives().then(function (response) {
					vm.objectives = response.data;
					vm.score = response.summary;
				initializeSkipped();
					bindScore();
					$rootScope.$broadcast(appEvents.updateLevel, {
						level: vm.score.level
					});


				},
				function (err) {
					toaster.pop('error', 'An error occured getting objectives.', err);
				});
		}

		function save() {
			// TODO : filter objectives that have something changed?
			competencyProfileService.save(vm.objectives, vm.score.level).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your competency score has been updated');
				vm.score = response.summary;
				bindScore();
				$rootScope.$broadcast(appEvents.updateLevel, {
					level: vm.score.level
				});
			}, function (err) {
				toaster.pop('error', 'An error occured saving', err);
			});
		}

		function scoreObjective(objective, score) {
			objective.isMet = score;
			objective.skipped = false;
			vm.save();
		}
	}
})();
