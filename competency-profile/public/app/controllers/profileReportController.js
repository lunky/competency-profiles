(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ProfileReportController', ProfileReportController);

	ProfileReportController.$inject = ['toaster', '$routeParams'];

	function ProfileReportController(toaster, $routeParams) {
		var vm = this;
		vm.username = $routeParams.username;
		// go get this user and the user document
	}
})();
