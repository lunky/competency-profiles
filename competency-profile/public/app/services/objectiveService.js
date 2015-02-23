﻿'use strict';
 (function () {
	var myApp = angular.module('consultingServices');
	myApp.service('objectiveService', ['$http', '$q', function ($http, $q) {
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
		if (
			!angular.isObject(response.data) ||
				!response.data.message
		) {
			return ($q.reject('An unknown error occurred.'));
		}
			// Otherwise, use expected error message.
			return ($q.reject(response.data.message));
		}

		this.getObjectives = function() {
			var request = $http({
				method: 'get',
				url: '/objectives/list'
			});
			return (request.then(handleSuccess, handleError));
		};

		this.save = function(objectives) {
			/*
			 * this should save objectives ... not a competency profile
			 * add save logic for objective admin <here> 
			*/
							
		};
	}]);
})();