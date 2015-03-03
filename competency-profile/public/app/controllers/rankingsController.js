(function () {
    'use strict';

    angular
        .module('consultingControllers')
        .controller('RankingsController', RankingsController);

    function RankingsController() {
        var vm = this;
        vm.level = 'all';
        vm.consultants = [
            {name: 'admin', level: 'Senior'},
            {name: 'aaron', level: 'Intermediate'},
            {name: 'quinn', level: 'Consultant'}];

        initialize();

        function initialize() {
        }
    }
})();
