'use strict';
(function () {
	var myApp = angular.module('CompetencyProfilesServices');

	myApp.service('objectiveAdminService', objectiveAdminService);

	objectiveAdminService.$inject = ['$http', '$q'];

	function objectiveAdminService($http, $q) {
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
				!response.data.message
			) {
				return ($q.reject('An unknown error occurred.'));
			}
			// Otherwise, use expected error message.
			return ($q.reject(response.data.message));
		}

		svc.getObjectives = function () {
			var request = $http({
				method: 'get',
				url: '/api/objectives/'
			});
			return (request.then(handleSuccess, handleError));
		};

		svc.getObjective = function (id) {
			var request = $http({
				method: 'get',
				url: '/api/objectives/' + id
			});
			return (request.then(handleSuccess, handleError));
		};

		svc.save = function (objective) {
			var request = $http({
				method: 'put',
				url: '/api/objectives/' + objective._id,
				data: {
					objective: objective
				}
			});
			return (request.then(handleSuccess, handleError));
		};
		return svc;
	}
})();
