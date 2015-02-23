(function (angular) {
	'use strict';
	console.log('consulting app');
	angular.module('consultingServices', []);
	angular.module('consultingControllers', ['consultingServices']);
	var myApp = angular.module('consulting',
			['ngRoute', 'ngAnimate', 'ui.bootstrap', 'consultingControllers', 'consultingServices']);
	myApp.config([
		'$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
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
					.when('/objectives', {
				templateUrl: 'objectives',
				controller: 'ObjectiveController',
				controllerAs: 'vm'
			})
					.when('/:oid?', {
				templateUrl: 'competencyProfile',
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

	myApp.run(['$location', '$route', '$rootScope', function ($location, $route, $rootScope) {
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
