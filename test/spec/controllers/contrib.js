'use strict';

describe('Controller: ContribCtrl', function () {

  // load the controller's module
  beforeEach(module('netflixinterviewApp'));

  var ContribCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContribCtrl = $controller('ContribCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
