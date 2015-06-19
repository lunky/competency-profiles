/*global escape: true */
(function (angular) {
	'use strict';
	console.log('CompetencyProfiles app');
	angular.module('CompetencyProfilesCommon', []);
	angular.module('CompetencyProfilesServices', ['CompetencyProfilesCommon']);
	angular.module('CompetencyProfilesDirectives', []);
	angular.module('CompetencyProfilesControllers', ['CompetencyProfilesCommon',
													'CompetencyProfilesServices',
													'CompetencyProfilesDirectives',
													'googlechart']);
	var myApp = angular.module('CompetencyProfiles', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'toaster',
													'CompetencyProfilesControllers', 'CompetencyProfilesServices']);

	myApp.config([
		'$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/competencyLevels', {
					templateUrl: '/app/views/competencyLevels.html',
					controller: 'CompetencyLevelsController',
					controllerAs: 'vm'
				})
				.when('/objectiveAdmin', {
					templateUrl: '/app/views/objectiveAdmin.html',
					controller: 'ObjectiveAdminController',
					controllerAs: 'vm'
				})
				.when('/teamMembers', {
				    templateUrl: 'app/views/teamMembers.html',
					controller: 'TeamMembersController',
					controllerAs: 'vm'
				})
				.when('/:oid?', {
					templateUrl: '/app/views/competencyProfile.html',
					controller: 'CompetencyProfileController',
					controllerAs: 'vm'
				})
				.when('/profileReport/:username', {
					templateUrl: 'profileReport',
					controller: 'ProfileReportController',
					controllerAs: 'vm'
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
					var currentUrl = $window.location.pathname + $window.location.hash;
					var newUrl = '/login?redirectUrl=' + escape(currentUrl);
					$window.location.href = newUrl;
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
		/*
				$rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
					console.log("$location: " + $location.$$absUrl);
					console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
				});
		*/
}]);

})(window.angular);
