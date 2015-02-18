'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('CompetencyLevelsController', [
		'competencyLevelsService', function (competencyLevelsService) {
			var vm = this;
			vm.competencyLevels = [];
			vm.initialize = function () {
				competencyLevelsService.getCompetencyLevels().then(function (data) {
					vm.competencyLevels = data.data;
				});
			};
			vm.initialize();
		}]);

})();
