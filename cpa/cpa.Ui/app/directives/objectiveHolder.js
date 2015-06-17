//objectiveHolder
'use strict';
(function () {
	var myApp = angular.module('CompetencyProfilesDirectives')
		.directive('objectiveHolder', objectiveHolder);

	function objectiveHolder() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'app/views/objective.html',
			scope: {
				objective: '=objectiveHolder',
				saveClicked: '&'
			},
			controller: ObjectiveController,
			controllerAs: 'vm',
			bindToController: true
		};
		return directive;
	}

	function ObjectiveController() {
		var vm = this;
		vm.toggleEdit = toggleEdit;
		vm.save = save;

		function save() {
			vm.objective.edit = false;
			vm.originalObjective = null;
			vm.saveClicked();
		}

		function toggleEdit() {
			var objective = vm.objective;
			objective.edit = !objective.edit;

			if (objective.edit) {
				vm.originalObjective = angular.copy(objective);
			} else {
				var prev = vm.originalObjective;
				if (prev != null) {
					objective.description = prev.description;
					objective.supportingExample = prev.supportingExample;
					objective.counterExample = prev.counterExample;
					objective.gateLevel = prev.gateLevel;
					objective.score = prev.score;
					objective.communication = prev.communication;
					objective.leadership = prev.leadership;
					objective.interpersonal = prev.interpersonal;
					objective.conflict = prev.conflict;
					objective.citizenship = prev.citizenship;
					vm.originalObjective = null;
				}
			}
		}
	}
})(window.angular);
