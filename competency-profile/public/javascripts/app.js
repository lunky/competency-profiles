(function (angular) {
	'use strict';
	console.log("consulting app");
	angular.module('consultingServices', []);
	var myApp = angular.module('consulting', ['ngRoute', 'ngAnimate', 'consultingControllers', 'consultingServices']);
	myApp.config([
		'$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/members', {
					templateUrl: 'members',
					controller: 'MembersController',
					controllerAs: 'vm'
				})
				.when('/', {
					templateUrl: 'objectives',
					controller: 'CompetencyProfileController',
					controllerAs: 'vm'
				}).
				otherwise({
					redirectTo: '/'
				});
//			$locationProvider.html5Mode(true);
		}
	]);})(window.angular);