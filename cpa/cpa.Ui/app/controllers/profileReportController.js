(function() {
    "use strict";

    angular
        .module("CompetencyProfilesControllers")
        .controller("ProfileReportController", ProfileReportController);

    ProfileReportController.$inject = [
        "$filter", "$routeParams",
        "competencyProfileService", "competencyLevelsService", "profileSummaryService", "toaster"
    ];

    function ProfileReportController($filter, $routeParams, competencyProfileService,
        competencyLevelsService, profileSummaryService, toaster) {
        var vm = this;

        vm.profile = {};
        vm.username = $routeParams.username;
        vm.showExamples = false;
        vm.gateFilter = {};
        vm.scoreFilter = {};
        vm.showExamples = false;
        vm.showRequiredExamples = false;
        vm.toggleExamples = toggleExamples;
        vm.toggleRequiredExamples = toggleRequiredExamples;
        vm.pointsNeededForNextLevel = 0;
        initialize();

        // go get this user and the user document
        function initialize() {
            var levels = [];
            competencyLevelsService.getCompetencyLevels().then(
                function(response) {
                    angular.forEach(response, function(lvl) {
                        var name = lvl.gateLevelDescription;
                        levels[name] = lvl;
                    });

                    competencyProfileService.getObjectivesByUsername(vm.username)
                        .then(
                            function(response) {
                                vm.profile = response;
                                vm.profile.summary = profileSummaryService.getScore(response.data, levels);
                                //vm.personal = response.personal;
                                vm.gateFilter = {
                                    isMet: false,
                                    gateLevel: vm.profile.summary.nextLevel
                                };

                                vm.scoreFilter = {
                                    isMet: false,
                                    gateLevel: '!' + vm.profile.summary.nextLevel
                                };

                                vm.pointsNeededForNextLevel = Math.max((vm.profile.summary.nextLevelScore - (vm.profile.summary.score - vm.profile.summary.gateScore)), 0);
                            },
                            function(err) {
                                toaster.pop("error", "Error Retrieving Objectives", err);
                            }
                        );
                });
        };

        function toggleExamples() {
            var objectives = $filter("filter")(vm.profile.data, vm.scoreFilter);

            angular.forEach(objectives, function(objective) {
                objective.open = vm.showExamples;
            });
        }

        function toggleRequiredExamples() {
            var objectives = $filter("filter")(vm.profile.data, vm.gateFilter);

            angular.forEach(objectives, function(objective) {
                objective.open = vm.showRequiredExamples;
            });
        }
    }
})();