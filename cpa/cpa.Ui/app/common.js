// common .js
(function (angular) {
	'use strict';
	console.log('CompetencyProfilesCommon');
	angular.module('CompetencyProfilesCommon')
		.value('appEvents', {
			updateLevel: 'updateLevel'
		});
})(window.angular);
