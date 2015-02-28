(function() {
	'use strict';

	angular
		.module('consultingControllers')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'appEvents', 'toaster'];

	function HeaderController($scope, appEvents, toaster) {
		
		var vm = this;
		vm.consultantLevel = "Competency Profile Incomplete";
		
		initialize();
		
		function initialize() {
			console.log("initializing header controller");
			
			$scope.$on(appEvents.updateLevel, function(event, data){
                console.log('received level update: ' + data.level);
				vm.consultantLevel = data.level;
            });		
		}
	}
})();