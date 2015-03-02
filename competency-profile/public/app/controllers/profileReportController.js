//TODO
//  Change to load data for provided User (vs. current user)
//      this _should_ require checking to ensure that the current user has access to view the seleted user's data

(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('ProfileReportController', ProfileReportController);

	ProfileReportController.$inject = ['$routeParams', 'competencyProfileService', 'toaster'];

	function ProfileReportController($routeParams, competencyProfileService, toaster) {
		var vm = this;
        vm.objectives = [];
		vm.username = $routeParams.username;
		
		initialize();
		
		// go get this user and the user document
		function initialize(){
			competencyProfileService.getObjectives()
			.then(
				function(response){
					vm.objectives = response.data;
				}
				,function(err){
					toaster.pop('error', 'Error Retrieving Objectives', err);
				}
			);
		}
	}
})();
