'use strict';
(function () {
	var myApp = angular.module('CompetencyProfilesServices');

	myApp.service('competencyLevelsService', competencyLevelsService);

	competencyLevelsService.$inject = ['$http', '$q'];

	function competencyLevelsService($http, $q) {
		var svc = {};
		// I transform the successful response, unwrapping the application data
		// from the API response payload.

		function handleSuccess(response) {
			return (response.data);
		}

		// I transform the error response, unwrapping the application data from
		// the API response payload.

		function handleError(response) {
			// The API response from the server should be returned in a
			// normalized format. However, if the request was not handled by the
			// server (or what not handles properly - ex. server error), then we
			// may have to normalize it on our end, as best we can.
			if (!angular.isObject(response.data) ||
				!response.data.message) {
				return ($q.reject('An unknown error occurred.'));
			}
			// Otherwise, use expected error message.
			return ($q.reject(response.data.message));
		}

		svc.getCompetencyLevels = function () {
			var request = $http({
				method: 'get',
				url: '/api/competencyLevel/'
			});
			return (request.then(handleSuccess, handleError));
		};

		svc.getCompetencyLevelLookups = function () {
			var request = $http({
				method: 'get',
				url: '/api/competencyLevel/lookup'
			});
			return (request.then(handleSuccess, handleError));
		};

		svc.getCompetencyLevel = function (id) {
			var request = $http({
				method: 'get',
				url: '/api/competencyLevel/' + id
			});
			return (request.then(handleSuccess, handleError));
		};

		svc.save = function (competencyLevel) {
			var request = $http({
				method: 'put',
				url: '/api/competencyLevel/' + competencyLevel._id,
				data: {
					level: competencyLevel
				}
			});
			return (request.then(handleSuccess, handleError));
		};
		return svc;
	}
})();
