(function(angular) {
    'use strict';
    console.log("consulting profile controller");
    var myApp = angular.module('consulting');
    myApp.controller('CompetencyProfileController', [
        'objectivesService', function (objectivesService) {
            var vm = this;
            vm.objectives = [];
			vm.currIndex = 0;
	        vm.next = function() {
		        if (vm.currIndex < vm.objectives.length - 1) {
			        vm.currIndex += 1;
		        }
		        vm.curr = vm.objectives[vm.currIndex];
	        };
	        vm.prev = function() {
		        if (vm.currIndex > 0) {
			        vm.currIndex -= 1;
		        }
		        vm.curr = vm.objectives[vm.currIndex];
	        };
	        vm.initialize = function() {
		        objectivesService.getObjectives().then(function(data) {
			        vm.objectives = data.data;
			        vm.curr = vm.objectives[vm.currIndex];
		        });
	        };
	        vm.meetObjective = function() {
		        vm.curr.isMet = !vm.curr.isMet;
	        };
	        vm.initialize();
        }
    ]);
})(window.angular);