'use strict';
(function () {
	var myApp = angular.module('consultingServices');
	myApp.service('membersService', ['$q', function ($q) {
			this.getMembers = function () {
				var deferred = $q.defer();
				deferred.resolve({
					data:
					[
						{
							"userId": "qwilson"
						},
						{
							"userId": "dkroeker"
						},
						{
							"userId": "alevine"
						},
						{
							"userId": "bmckay"
						}
					]
				});
				return deferred.promise;
			}
		}]);
})();