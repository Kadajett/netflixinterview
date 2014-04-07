'use strict';

describe('Controller: listCtrl', function () {

  // load the controller's module
  beforeEach(module('netflixinterviewApp'));

  var listCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    listCtrl = $controller('listCtrl', {
      $scope: scope
    });
  }));

  //Switching the scope.ascend variable
  it('scope.ascend should be true, then switchAscend is called and scope.ascend should be false', function () {
    expect(scope.ascend).toBe(true);
    scope.switchAscend();
    expect(scope.ascend).toBe(false);
  });
});
