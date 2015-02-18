'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('CompetencyProfileController', [
		'$filter', 'objectiveLevelsService', 'objectivesService', function ($filter, objectiveLevelsService, objectivesService) {
			var vm = this;
            vm.changed = false;
			vm.objectives = [];
			vm.currIndex = 0;
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
				}
				vm.curr = vm.objectives[vm.currIndex];
			};
			vm.save = function () {
				// TODO : filter objectives that have something changed?
				var objectives = vm.objectives;
				objectivesService.save(objectives).then(function (data) {
					vm.consultantLevel = data.score;
				});
			};
			vm.prev = function () {
				if (vm.currIndex > 0) {
					vm.currIndex -= 1;
				}
				vm.curr = vm.objectives[vm.currIndex];
			};
			vm.initialize = function() {
				objectivesService.getObjectives().then(function(data) {
					var objectives = data.data;
				    vm.objectives = objectives;
					vm.curr = vm.objectives[vm.currIndex];
                });

                objectiveLevelsService.getObjectiveLevels().then(function (data) {
                    vm.objectiveLevels = data.data;
                });
			};
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
