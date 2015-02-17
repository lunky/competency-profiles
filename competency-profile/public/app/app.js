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
					.when('/objectiveLevels', {
						templateUrl: 'objectiveLevels',
						controller: 'ObjectiveLevelsController',
						controllerAs: 'vm'
					})
					.when('/:oid?', {
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

	myApp.run(['$location', '$route', '$rootScope', function($location, $route, $rootScope) {
		$location.skipReload = function () {
			var lastRoute = $route.current;
			var un = $rootScope.$on('$locationChangeSuccess', function () {
				$route.current = lastRoute;
				un();
			});
			return $location;
		};
		return $location;
	}]);
}
)(window.angular);
