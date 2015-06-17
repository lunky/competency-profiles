//levelHolder
'use strict';
(function () {
	var myApp = angular.module('CompetencyProfilesDirectives')
		.directive('levelHolder', levelHolder);

	function levelHolder() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'app/views/level.html',
			scope: {
				level: '=levelHolder',
				saveClicked: '&'
			},
			controller: LevelController,
			controllerAs: 'vm',
			bindToController: true
		};
		return directive;
	}

	function LevelController() {
		var vm = this;
		vm.toggleEdit = toggleEdit;
		vm.save = save;

		function save() {
			vm.level.edit = false;
			vm.originalLevel = null;
			vm.saveClicked();
		}

		function toggleEdit() {
			var level = vm.level;
			level.edit = !level.edit;
			if (level.edit) {
				vm.originalLevel = angular.copy(level);
			} else {
				var prev = vm.originalLevel;
				if (prev != null) {
					level.minimumScore = prev.minimumScore;
					level.minimumGateScore = prev.minimumGateScore;
					vm.originalLevel = null;
				}
			}
		}
	}
})(window.angular);
