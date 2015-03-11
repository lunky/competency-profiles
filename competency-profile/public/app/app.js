(function (angular) {
	'use strict';
	console.log('consulting app');
	angular.module('consultingCommon', []);
	angular.module('consultingServices', ['consultingCommon']);
	angular.module('consultingDirectives', []);
	angular.module('consultingControllers', ['consultingCommon', 'consultingServices', 'consultingDirectives']);
	var myApp = angular.module('consulting', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'toaster',
								'consultingControllers', 'consultingServices']);

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
				.when('/objectiveAdmin', {
					templateUrl: 'objectiveAdmin',
					controller: 'ObjectiveAdminController',
					controllerAs: 'vm'
				})
				.when('/rankings', {
					templateUrl: 'rankings',
					controller: 'RankingsController',
					controllerAs: 'vm'
				})
				.when('/:oid?', {
					templateUrl: 'competencyProfile',
					controller: 'CompetencyProfileController',
					controllerAs: 'vm'
				})
				.when('/profileReport/:username', {
					templateUrl: 'profileReport',
					controller: 'ProfileReportController',
					controllerAs: 'vm'
				})
				.otherwise({
					redirectTo: '/'
				});
			//			$locationProvider.html5Mode(true);
		}
	]);

	myApp.factory('authHttpResponseInterceptor', ['$q', '$window', function ($q, $window) {
		return {
			response: function (response) {
				if (response.status === 401) {
					console.log('Response 401');
				}
				return response || $q.when(response);
			},
			responseError: function (rejection) {
				if (rejection.status === 401) {
					console.log('Response Error 401', rejection);
					//              $location.url('/login').search('returnTo', $location.path());
					$window.location.href = '/login';
					return;
				}
				return $q.reject(rejection);
			}
		};
	}]);

	myApp.config(['$httpProvider', function ($httpProvider) {
		//Http Intercpetor to check auth failures for xhr requests
		$httpProvider.interceptors.push('authHttpResponseInterceptor');
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	}]);

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

})(window.angular);
