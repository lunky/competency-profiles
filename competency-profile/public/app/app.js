(function(angular) {
		'use strict';
		console.log('consulting app');
	angular.module('consultingServices', []);
	angular.module('consultingControllers', ['consultingServices']);
	var myApp = angular.module('consulting',
			['ngRoute', 'ngAnimate', 'consultingControllers', 'consultingServices']);
		myApp.config([
				'$routeProvider', '$locationProvider',
				function($routeProvider, $locationProvider) {
					$routeProvider
						.when('/members', {
							templateUrl: 'members',
							controller: 'MembersController',
							controllerAs: 'vm'
						})
						.when('/competencyLevels', {
							templateUrl: 'competencyLevels',
							controller: 'CompetencyLevelsController',
							controllerAs: 'vm'
						})
						.when('/', {
							templateUrl: 'objectives',
							controller: 'CompetencyProfileController',
							controllerAs: 'vm'
						})
						.otherwise({
							redirectTo: '/'
						});
//			$locationProvider.html5Mode(true);
				}
			]
		);
	}
)(window.angular);
