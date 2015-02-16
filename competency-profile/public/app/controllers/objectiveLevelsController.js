'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('ObjectiveLevelsController', [
		'objectiveLevelsService', function (objectiveLevelsService) {
			var vm = this;
			vm.objectiveLevels = [];
			vm.initialize = function () {
				objectiveLevelsService.getObjectiveLevels().then(function (data) {
					vm.objectiveLevels = data.data;
				});
			};
			vm.initialize();
		}]);

})();
