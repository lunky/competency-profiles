﻿'use strict';
(function() {

	var myApp = angular.module('consultingControllers', ['consultingServices']);

	myApp.controller('MainCtrl', [
		'$route', '$routeParams', '$location',
		function($route, $routeParams, $location) {
			this.$route = $route;
			this.$location = $location;
			this.$routeParams = $routeParams;
		}
	]);

	myApp.controller('MembersController', [
		'membersService', function(membersService) {
			var vm = this;
			vm.members = [];
			vm.initialize = function () {
				membersService.getMembers().then(function (data) {
					vm.members = data.data;
				});
			};
			vm.initialize();
		}]);

	myApp.controller('CompetencyProfileController', [
		'objectivesService', function (objectivesService) {
			var vm = this;
			vm.changed = false;
			vm.objectives = [];
			vm.currIndex = 0;
			vm.next = function() {
				if (vm.currIndex < vm.objectives.length - 1) {
					vm.currIndex += 1;
				}
				vm.curr = vm.objectives[vm.currIndex];
			};
			vm.save = function () {
				// TODO : filter objectives that have something changed?
				var objectives = vm.objectives;
				objectivesService.save(objectives).then(function (data) {
					vm.consultantLevel = data.score;
					vm.changed = false;
				});
			};
			vm.prev = function () {
				if (vm.currIndex > 0) {
					vm.currIndex -= 1;
				}
				vm.curr = vm.objectives[vm.currIndex];
			};
			vm.initialize = function() {
				objectivesService.getObjectives().then(function(data) {
					vm.objectives = data.data;
					vm.curr = vm.objectives[vm.currIndex];
				});
			};
			vm.meetObjective = function() {
				vm.changed = true;
				vm.curr.isMet = !vm.curr.isMet;
				vm.save();
			};
			vm.initialize();
		}
	]);
})();
