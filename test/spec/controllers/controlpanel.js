'use strict';

describe('Controller: ControlpanelCtrl', function () {

  // load the controller's module
  beforeEach(module('netflixinterviewApp'));

  var ControlpanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControlpanelCtrl = $controller('ControlpanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
