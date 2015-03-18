// bundle.config.js
module.exports = {
	bundle: {
		main: {
			scripts: [
				'./public/app/app.js',
				'./public/app/common.js',
				'./public/app/services/objectiveAdminService.js',
				'./public/app/services/competencyLevelsService.js',
				'./public/app/services/competencyProfileService.js',
				'./public/app/directives/levelHolder.js',
				'./public/app/directives/objectiveHolder.js',

				'./public/app/controllers/navController.js',
				'./public/app/controllers/headerController.js',
				'./public/app/controllers/objectiveAdminController.js',
				'./public/app/controllers/competencyProfileController.js',
				'./public/app/controllers/mainController.js',
				'./public/app/controllers/competencyLevelsController.js',
				'./public/app/controllers/profileReportController.js',
				'./public/app/controllers/rankingsController.js'
			],
			styles: [
				'./public/css/styles.css',
			],
		},
		vendor: {
			scripts: [
				'./bower_components/angular/angular.js',
				'./bower_components/angular-route/angular-route.js',
				'./bower_components/angular-animate/angular-animate.js',
				'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
				'./bower_components/angularjs-toaster/toaster.js'
			],
			styles: [
				'./bower_components/angularjs-toaster/toaster.css',
				'./bower_components/font-awesome/css/font-awesome.min.css'
			]
		}
	}

};
