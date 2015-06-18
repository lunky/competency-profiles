(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('ObjectiveAdminController', ObjectiveAdminController)
		.filter('searchFilter', SearchFilter);

	ObjectiveAdminController.$inject = ['competencyLevelsService', 'objectiveAdminService', 'toaster'];

	function ObjectiveAdminController(competencyLevelsService, objectiveAdminService, toaster) {

		var vm = this;
		vm.objectives = [];
		vm.originalObjectives = [];
		vm.gateLevels = [];
		vm.initialize = initialize;
		vm.save = save;

		initialize();

		vm.toggleEdit = function toggleEdit(objective) {
			objective.edit = !objective.edit;

			if (objective.edit) {
				remember(objective);
			} else {
				var prev = recall(objective.objectiveId);
				if (prev != null) {
					objective.description = prev.description;
					objective.supportingExample = prev.supportingExample;
					objective.counterExample = prev.counterExample;
					objective.gateLevel = prev.gateLevel;
					objective.score = prev.score;
					objective.communication = prev.communication;
					objective.leadership = prev.leadership;
					objective.interpersonal = prev.interpersonal;
					objective.conflict = prev.conflict;
					objective.citizenship = prev.citizenship;
				}
				unremember(objective.objectiveId);
			}
		};

		function remember(objective) {
			vm.originalObjectives.push(angular.copy(objective));
		}

		function unremember(objectiveId) {
			vm.originalObjectives = vm.originalObjectives.filter(function (el) {
				return el.objectiveId !== objectiveId;
			});
		}

		function recall(objectiveId) {
			var objective;
			for (var i = 0; i < vm.originalObjectives.length; i++) {
				if (vm.originalObjectives[i].objectiveId === objectiveId) {
					objective = vm.originalObjectives[i];
					break;
				}
			}
			return objective;
		}

		function initialize() {
			objectiveAdminService.getObjectives().then(function (response) {
				vm.objectives = response;
			}, function (err) {
				toaster.pop('error', 'Error loading objectives', err);
			});

			competencyLevelsService.getCompetencyLevelLookups().then(function (response) {
				vm.gateLevels = response;
			}, function (err) {
				toaster.pop('error', 'Error loading levels', err);
			});
		}

		function save(objective) {
			objective.edit = false;
			vm.originalObjectives = vm.originalObjectives.filter(function (el) {
				return el.objectiveId !== objective.objectiveId;
			});

			objectiveAdminService.save(objective).then(function (response) {
				toaster.pop('success', 'Save Successful', 'Your objective metadata was updated');
			}, function (err) {
				toaster.pop('error', 'Save Unsuccessful',
					'An error has occured. Your objective metadata changes have not been updated');
			});
		}
	}

	function SearchFilter($filter) {
		return function (items, searchfilter) {
			if (!searchfilter)
				return items;

			return items.filter(function (item) {
				if (item.edit)
					return true;

				var matching = true;
				for (var property in searchfilter) {
					if (!searchfilter[property]) continue;

					if (item.hasOwnProperty(property)) {
						if (typeof (item[property]) === "string") {
							matching = matching && item[property].toLowerCase().indexOf(searchfilter[property].toLowerCase()) >= 0;
							if (!matching) return false;
						} else {
							matching = matching && item[property] == searchfilter[property];
							if (!matching) return false;
						}
					} 
				}
				return true;
			});
		}
	}
})();
