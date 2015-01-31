
(function () {
	'use strict';
	
	describe('CompetencyProfileController', function () {
		beforeEach(module('consulting'));
		
		beforeEach(function () {

		});
		
		it('is defined', inject(function ($controller, $q) {
				
				var deferred = $q.defer();
				var promise = deferred.promise;
				var svc = { getObjectives : sinon.stub().returns(promise) };
				deferred.resolve({
					data: {}
				});
				//spec body
				var ctrl = $controller('CompetencyProfileController', { objectivesService: svc });
				expect(ctrl).toBeDefined();
			}));
		it('calls service', inject(function ($controller, $q) {
				
				var deferred = $q.defer();
				var promise = deferred.promise;
				var svc = { getObjectives : sinon.stub().returns(promise) };
				deferred.resolve({
					data: {}
				});
				//spec body
				var ctrl = $controller('CompetencyProfileController', { objectivesService: svc });
				sinon.assert.called(svc.getObjectives);				
			}));
	});
})();


