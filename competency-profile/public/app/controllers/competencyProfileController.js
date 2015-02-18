'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('CompetencyProfileController', [
		'objectivesService', '$routeParams', '$location', function (objectivesService, $routeParams, $location) {
			var vm = this;
			vm.objectives = [];
			vm.changed = false;
			vm.currIndex = 0;

			if ($routeParams.oid) {
				var idx = Number($routeParams.oid) - 1;
				vm.currIndex = idx;
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
					vm.changed = false;
				});
			};

			vm.initialize = function() {
				objectivesService.getObjectives().then(function(data) {
					vm.objectives = data.data;
					if (vm.currIndex < 0) {
						vm.currIndex = 0;
					}
					if (vm.currIndex > vm.objectives.length - 1) {
						vm.currIndex = vm.objectives.length - 1;
					}
					syncLocation(true);
				});
			};

			vm.meetObjective = function() {
				vm.changed = true;
				vm.curr.isMet = !vm.curr.isMet;
				vm.save();
			};
			vm.initialize();
		}
	]);
})();
