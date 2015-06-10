(function () {
	'use strict';

	angular
		.module('CompetencyProfilesControllers')
		.controller('RankingsController', RankingsController);

	RankingsController.$inject = ['competencyProfileService', 'toaster'];

	function RankingsController(competencyProfileService, toaster) {
		var vm = this;
		vm.level = 'all';
		vm.consultants = [];

		initialize();

		function initialize() {
			competencyProfileService.getRankings().then(function (response) {
					if (response.result === 'success') {
						vm.consultants = response.profileList.map(function (user) {
							return {
								userid: user.userid,
								name: user.displayName || user.userid,
								level: user.level,
								thumbnailPhoto: user.thumbnailPhoto
							};
						});
					}
				},
				function (err) {
					toaster.pop('error', 'Error loading rankings', err);
				}
			);
		}
	}
})();
