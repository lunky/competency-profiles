
(function () {
	'use strict';

	describe('CompetencyProfileController', function() {
		beforeEach(module('consulting'));

		/* as soon as $route is used, karma requests the /objectives */
		beforeEach(inject(function(_$templateCache_) {
			var $templateCache = _$templateCache_;
			$templateCache.put('competencyLevels/list', '');
		}));

		it('is defined', inject(function($controller, $q) {

			var deferred = $q.defer();
			var promise = deferred.promise;
			var svc = {getObjectives: sinon.stub().returns(promise)};
			deferred.resolve({
				data: []
			});
			//spec body
			var ctrl = $controller('CompetencyProfileController', {objectivesService: svc});
			expect(ctrl).toBeDefined();
		}));
		it('calls service', inject(function($controller, $q) {

			var deferred = $q.defer();
			var promise = deferred.promise;
			var svc = {getObjectives: sinon.stub().returns(promise)};
			deferred.resolve({
				data: []
			});
			//spec body
			var ctrl = $controller('CompetencyProfileController', {objectivesService: svc});
			sinon.assert.called(svc.getObjectives);
		}));
		it('sets objectives with data from service', inject(function($controller, $q, $rootScope) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			var svc = {getObjectives: sinon.stub().returns(promise)};
			var testObjective = {
				'reviewedObjective': 'Organizes work and manage teams to achieve specific goals or outcomes'
			};
			deferred.resolve({
				data: [
					testObjective
				]
			});

			//spec body
			var scope = $rootScope.$new();
			var ctrl = $controller('CompetencyProfileController as vm', {$scope: scope, objectivesService: svc});
			$rootScope.$apply(); // trigger digest
			expect(scope.vm.objectives.length).toBeDefined();
			expect(scope.vm.objectives.length).toBe(1);
			expect(scope.vm.objectives[0]).toBe(testObjective);
		}));
	});

	describe('MembersController', function() {
		var deferred;
		var scope;
		var ctrl;
		var promise;
		var testUser = {'userId': 'testuser'};
		var svc;
		beforeEach(module('consulting'));

		/* as soon as $route is used, karma requests the /objectives */
		beforeEach(inject(function(_$templateCache_) {
			var $templateCache = _$templateCache_;
			$templateCache.put('objectives', '');
		}));

		beforeEach(inject(function($controller, $q, $rootScope) {
			deferred = $q.defer();
			promise = deferred.promise;
			svc = {getMembers: sinon.stub().returns(promise)};
			deferred.resolve({
				data: [
					testUser
				]
			});
			scope = $rootScope.$new();
			ctrl = $controller('MembersController as vm', {$scope: scope, membersService: svc});
		}));

		it('is defined', function () {
			expect(ctrl).toBeDefined();
		});
		it('calls service', inject(function($controller, $q) {
			sinon.assert.called(svc.getMembers);
		}));

		it('sets members with data from service', inject(function ($controller, $q, $rootScope) {
			$rootScope.$apply(); // trigger digest
			expect(scope.vm.members.length).toBeDefined();
			expect(scope.vm.members.length).toBe(1);
			expect(scope.vm.members[0]).toBe(testUser);
		}));
	});
})();
