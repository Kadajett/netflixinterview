'use strict';

describe('Controller: UserinputctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('netflixinterviewApp'));

  var UserinputctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserinputctrlCtrl = $controller('UserinputctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
