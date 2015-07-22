'use strict';
(function () {
	var myApp = angular.module('CompetencyProfilesServices');

	myApp.service('teamMembersService', teamMembersService);

	teamMembersService.$inject = ['$http', '$q'];

	function teamMembersService($http, $q) {
		var svc = {};

		function handleSuccess(response) {
			return (response.data);
		}

		function handleError(response) {

			if (!angular.isObject(response.data) ||
				!response.data.message) {
				return ($q.reject('An unknown error occurred.'));
			}

		    // Trying to get the specific exception message
			var message = response.data.exceptionMessage || response.data.message;
			return ($q.reject(message));
		}

		svc.getTeamMembers = function () {
			var request = $http({
				method: 'get',
				url: '/api/teamMembers/'
			});
			return (request.then(handleSuccess, handleError));
		};

	    svc.getTeamMemberByUsername = function(username) {
	        var request = $http({
	            method: 'get',
	            url: '/api/teamMembers/' + username
	        });
	        return (request.then(handleSuccess, handleError));
	    };

		return svc;
	}
})();
