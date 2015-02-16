'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('MembersController', [
		'membersService', function(membersService) {
			var vm = this;
			vm.members = [];
			vm.initialize = function () {
				membersService.getMembers().then(function (data) {
					vm.members = data.data;
				});
			};
			vm.initialize();
		}]);
})();
