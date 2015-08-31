'use strict';

(function() {
	// Datareports Controller Spec
	describe('Datareports Controller Tests', function() {
		// Initialize global variables
		var DatareportsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Datareports controller.
			DatareportsController = $controller('DatareportsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Datareport object fetched from XHR', inject(function(Datareports) {
			// Create sample Datareport using the Datareports service
			var sampleDatareport = new Datareports({
				name: 'New Datareport'
			});

			// Create a sample Datareports array that includes the new Datareport
			var sampleDatareports = [sampleDatareport];

			// Set GET response
			$httpBackend.expectGET('datareports').respond(sampleDatareports);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.datareports).toEqualData(sampleDatareports);
		}));

		it('$scope.findOne() should create an array with one Datareport object fetched from XHR using a datareportId URL parameter', inject(function(Datareports) {
			// Define a sample Datareport object
			var sampleDatareport = new Datareports({
				name: 'New Datareport'
			});

			// Set the URL parameter
			$stateParams.datareportId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/datareports\/([0-9a-fA-F]{24})$/).respond(sampleDatareport);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.datareport).toEqualData(sampleDatareport);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Datareports) {
			// Create a sample Datareport object
			var sampleDatareportPostData = new Datareports({
				name: 'New Datareport'
			});

			// Create a sample Datareport response
			var sampleDatareportResponse = new Datareports({
				_id: '525cf20451979dea2c000001',
				name: 'New Datareport'
			});

			// Fixture mock form input values
			scope.name = 'New Datareport';

			// Set POST response
			$httpBackend.expectPOST('datareports', sampleDatareportPostData).respond(sampleDatareportResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Datareport was created
			expect($location.path()).toBe('/datareports/' + sampleDatareportResponse._id);
		}));

		it('$scope.update() should update a valid Datareport', inject(function(Datareports) {
			// Define a sample Datareport put data
			var sampleDatareportPutData = new Datareports({
				_id: '525cf20451979dea2c000001',
				name: 'New Datareport'
			});

			// Mock Datareport in scope
			scope.datareport = sampleDatareportPutData;

			// Set PUT response
			$httpBackend.expectPUT(/datareports\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/datareports/' + sampleDatareportPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid datareportId and remove the Datareport from the scope', inject(function(Datareports) {
			// Create new Datareport object
			var sampleDatareport = new Datareports({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Datareports array and include the Datareport
			scope.datareports = [sampleDatareport];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/datareports\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDatareport);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.datareports.length).toBe(0);
		}));
	});
}());