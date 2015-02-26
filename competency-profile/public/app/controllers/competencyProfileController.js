(function () {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('CompetencyProfileController', CompetencyProfileController);

	CompetencyProfileController.$inject =
			['$filter', '$scope', 'toaster', 'competencyLevelsService', 'competencyProfileService', 'appEvents'];

	function CompetencyProfileController($filter, $scope, toaster, competencyLevelsService, competencyProfileService, appEvents) {
		var vm = this;

		vm.clearAll = clearAll;
		vm.competencyLevels = [];
		vm.objectives = [];
		vm.save = save;
		vm.scoreObjective = scoreObjective;

		initialize();

		function clearAll() {
			angular.forEach(vm.objectives, function (objective) {
				objective.isMet = false;
			});
			vm.save();
		}

		function initialize() {
			$scope.$on(appEvents.updateLevel, function(event, data){            
                console.log('received data: ' + data.msg);
                toaster.pop('success', 'Broadcast Received', 'Your data message payload was: ' + data.msg);
            });

			competencyProfileService.getObjectives().then(function (response) {
				var objectives = response.data;
				vm.objectives = objectives;
				vm.score = response.summary;
			}, function(err){
				toaster.pop('error', 'An error occured getting objectives.', err);
			});
		}

		function save() {
			// TODO : filter objectives that have something changed?
			var objectives = vm.objectives;
			competencyProfileService.save(objectives).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your competency score has been updated');
				vm.objectives = response.data;
				vm.score = response.summary;
			}, function(err){
				toaster.pop('error', 'An error occured saving', err);
			});
		}

		function scoreObjective(objective, score) {
			objective.isMet = score;
			vm.save();
		}
       
    }
})();
