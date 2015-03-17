(function() {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('MainCtrl', MainController);

	MainController.$inject =
	['$route', '$routeParams', '$location'];

	function MainController($route, $routeParams, $location) {
		this.$route = $route;
		this.$location = $location;
		this.$routeParams = $routeParams;
	}
})();
