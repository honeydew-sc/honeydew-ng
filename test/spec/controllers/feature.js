'use strict';

describe('Controller: FeatureCtrl', function () {

  // load the controller's module
  beforeEach(module('honeydewApp'));

  var FeatureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeatureCtrl = $controller('FeatureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
