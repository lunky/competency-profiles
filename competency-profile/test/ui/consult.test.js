/*jshint -W030 */
(function () {
	'use strict';

	describe('CompetencyProfileController', function () {
		beforeEach(module('CompetencyProfiles'));

		/* as soon as $route is used, karma requests the /objectives */
		beforeEach(inject(function ($httpBackend) {
			$httpBackend.whenGET('objectives').respond({});
			$httpBackend.whenGET('competencyProfile').respond({});
			$httpBackend.whenGET('/competencyLevels/list').respond({});
		}));

		it('is defined', inject(function ($controller, $q, $rootScope) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			var svc = {
				getObjectives: sinon.stub().returns(promise)
			};
			deferred.resolve({
				data: []
			});
			//spec body
			var scope = $rootScope.$new();
			var ctrl = $controller('CompetencyProfileController', {
				$scope: scope,
				competencyProfileService: svc
			});
			expect(ctrl).to.be.defined;
		}));
		it('calls service', inject(function ($controller, $q, $rootScope) {

			var deferred = $q.defer();
			var promise = deferred.promise;
			var svc = {
				getObjectives: sinon.stub().returns(promise)
			};
			deferred.resolve({
				data: []
			});
			//spec body
			var scope = $rootScope.$new();
			var ctrl = $controller('CompetencyProfileController', {
				$scope: scope,
				competencyProfileService: svc
			});
			sinon.assert.called(svc.getObjectives);
		}));
		it('sets objectives with data from service', inject(function ($controller, $q, $rootScope) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			var svc = {
				getObjectives: sinon.stub().returns(promise)
			};
			var testObjective = {
				'reviewedObjective': 'Organizes work and manage teams to achieve specific goals or outcomes'
			};
			var level = 'consultant';
			deferred.resolve({
				data: [
					testObjective
				],
				summary: [
					level
				]
			});

			//spec body
			var scope = $rootScope.$new();
			var ctrl = $controller('CompetencyProfileController as vm', {
				$scope: scope,
				competencyProfileService: svc
			});
			$rootScope.$apply(); // trigger digest
			expect(scope.vm.objectives.length).to.be.defined;
			expect(scope.vm.objectives.length).to.equal(1);
			expect(scope.vm.objectives[0]).to.equal(testObjective);
		}));
	});
})();
