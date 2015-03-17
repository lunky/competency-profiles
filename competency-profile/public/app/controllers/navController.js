(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('NavController', NavController);

	NavController.$inject = ['$location'];

	function NavController($location) {
		var vm = this;

		vm.getClass = function (path) {
			if ($location.path() === path) {
				return 'active';
			} else {
				return '';
			}
		};
	}
})(window.angular);
