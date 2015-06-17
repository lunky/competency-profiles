'use strict';
(function () {
    var myApp = angular.module('CompetencyProfilesServices');

    myApp.service('userAccessService', userAccessService);

    userAccessService.$inject = ['$http', '$q'];

    function userAccessService($http, $q) {
        var svc = {};

        function handleSuccess(response) {
            return (response.data);
        }

        function handleError(response) {

            if (!angular.isObject(response.data) ||
				!response.data.message
			) {
                return ($q.reject('An unknown error occurred.'));
            }
            // Otherwise, use expected error message.
            return ($q.reject(response.data.message));
        }

        svc.isCareerMentor = function () {
            var request = $http({
                method: 'get',
                url: '/api/UserAccess/IsCareerMentor/'
            });
            return (request.then(handleSuccess, handleError));
        };

        svc.isCpAdmin = function() {
            var request = $http({
                method: 'get',
                url: '/api/UserAccess/IsCpAdmin/'
            });
            return (request.then(handleSuccess, handleError));
        }

        return svc;
    }

})();