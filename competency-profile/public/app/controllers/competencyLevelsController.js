(function () {
    'use strict';

    angular
        .module('consultingControllers')
        .controller('CompetencyLevelsController', CompetencyLevelsController);

    CompetencyLevelsController.$inject = ['competencyLevelsService', 'toaster'];

    function CompetencyLevelsController(competencyLevelsService, toaster) {

        var vm = this;
        vm.competencyLevels = [];
        vm.initialize = initialize;
        vm.save = save;

        initialize();

        vm.toggleEdit = function toggleEdit(level) {
            level.edit = !level.edit;
            if (!level.edit) {
                competencyLevelsService.getCompetencyLevel(level._id).then(function (response) {
                    level.minimumScore = response.data.minimumScore;
                    level.minimumGateScore = response.data.minimumGateScore;
                });
            }
        };

        function initialize() {
            competencyLevelsService.getCompetencyLevels().then(function (response) {
                vm.competencyLevels = response.data;
            });
        }

        function save(level) {
            level.edit = false;
            competencyLevelsService.save(level).then(function (response) {
                console.log('service succes:' + response.data);
                toaster.pop('success', 'Save Successful', 'Your competency score has been updated');
                /*
                 * indicate to the user what's happened in the event of a failure
                 *
                 * Save failed -
                 */
            });
        }
    }
})();
