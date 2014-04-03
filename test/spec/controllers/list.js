'use strict';

describe('Controller: ListctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('netflixinterviewApp'));

  var ListctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListctrlCtrl = $controller('ListctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
