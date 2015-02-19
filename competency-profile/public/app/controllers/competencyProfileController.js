'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('CompetencyProfileController', [
		'$filter', 'competencyLevelsService', 'objectivesService', '$routeParams', '$location',
		function ($filter, competencyLevelsService, objectivesService, $routeParams, $location) {
			var vm = this;

			vm.changed = false;
			vm.objectives = [];
			vm.competencyLevels = [];
			vm.currIndex = 0;

			if ($routeParams.oid) {
				var idx = Number($routeParams.oid) - 1;
				vm.currIndex = idx;
			}

			vm.clearAll = clearAll;

			function clearAll() {
				angular.forEach(vm.objectives, function (objective) {
					objective.isMet = false;
					vm.save();
				});
			}

			vm.next = function() {
				if (vm.currIndex < vm.objectives.length - 1) {
					vm.currIndex += 1;
					syncLocation();
				}
			};

			vm.prev = function () {
				if (vm.currIndex > 0) {
					vm.currIndex -= 1;
					syncLocation();

				}
			};

			function syncLocation(replace) {
				var newPath = (vm.currIndex + 1).toString();
				var currPath = $location.path();
				if (currPath !== '/' + newPath) {
					if (replace) {
						$location.skipReload().path(newPath).replace();
					} else {
						$location.skipReload().path(newPath);
					}
				}
				vm.curr = vm.objectives[vm.currIndex];
			}

			vm.save = function () {
				// TODO : filter objectives that have something changed?
				var objectives = vm.objectives;
				objectivesService.save(objectives).then(function (data) {
					vm.consultantLevel = data.score;
				});
			};

			vm.initialize = function() {
				objectivesService.getObjectives().then(function(data) {
					var objectives = data.data;
					angular.forEach(objectives, function (objective) {
						objective.answered = false;
					});
					vm.objectives = objectives;
					if (vm.currIndex < 0) {
						vm.currIndex = 0;
					}
					if (vm.currIndex > vm.objectives.length - 1) {
						vm.currIndex = vm.objectives.length - 1;
					}
					syncLocation(true);
				});
			};

			competencyLevelsService.getCompetencyLevels().then(function (data) {
				vm.competencyLevels = data.data;
			});

			vm.yesObjective = function(objective) {
				objective.isMet = true;
				vm.save();
			};

			vm.noObjective = function (objective) {
				objective.isMet = false;
				vm.save();
			};

			vm.initialize();
		}
	]);
})();
