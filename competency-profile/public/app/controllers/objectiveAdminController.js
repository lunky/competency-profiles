(function () {
    'use strict';

    angular
        .module('consultingControllers')
        .controller('ObjectiveAdminController', ObjectiveAdminController);

    ObjectiveAdminController.$inject = ['objectiveAdminService', 'toaster'];

    function ObjectiveAdminController(objectiveAdminService, toaster) {

        var vm = this;
        vm.objectives = [];
        vm.initialize = initialize;
        vm.save = save;

        vm.gateLevels = [{
            id: 'base',
            label: 'Base'
        }, {
            id: 'intermediate',
            label: 'Intermediate'
        }, {
            id: 'senior',
            label: 'Senior'
        }];
        initialize();

        function initialize() {
            console.log('Objectives admin initialize started');

            objectiveAdminService.get().then(function (response) {
                vm.objectives = response.data;
            });

            console.log('Objectives admin initialize completed');
        }

        function save(objective) {
            objective.edit = false;
            objectiveAdminService.save(objective).then(function (response) {
                toaster.pop('success', 'Save Successful', 'Your objective metadata was updated');
            });
        }
    }
})();
