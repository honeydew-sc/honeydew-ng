'use strict';

describe('Controller: FeatureCtrl', function () {

  // load the controller's module
  beforeEach(module('honeydewApp'));

  var FeatureCtrl,
      scope,
      httpMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    httpMock = $httpBackend;
    scope = $rootScope.$new();
    FeatureCtrl = $controller('FeatureCtrl', {
      $scope: scope
    });
  }));

  it('should put the feature contents in the model', function() {
    httpMock.expectGET("/features_crud.php/fake.feature").respond({contents: 'fake feature contents!'});
    scope.display("fake.feature");
    httpMock.flush();
    expect(scope.contents).toBe('fake feature contents!');
  });
});
