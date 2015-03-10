// common .js
(function (angular) {
	'use strict';
	console.log('consultingCommon');
	angular.module('consultingCommon')
		.value('appEvents', {
			updateLevel: 'updateLevel'
		});
})(window.angular);
