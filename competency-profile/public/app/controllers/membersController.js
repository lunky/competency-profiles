(function () {
	'use strict';
	
	angular
		.module('consultingControllers')
		.controller('MembersController', MembersController);
	
	MembersController.$inject = ['membersService'];
	
	function MembersController(membersService) {
		var vm = this;
		vm.members = [];
		
		initialize();

		function initialize() {
			membersService.getMembers().then(function (response) {
				vm.members = response.data;
			});
		};
	}
})();