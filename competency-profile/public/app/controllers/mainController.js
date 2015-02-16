'use strict';
(function() {

	var myApp = angular.module('consultingControllers');

	myApp.controller('MainCtrl', [
		'$route', '$routeParams', '$location',
		function($route, $routeParams, $location) {
			this.$route = $route;
			this.$location = $location;
			this.$routeParams = $routeParams;
		}
	]);
})();
