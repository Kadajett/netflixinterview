'use strict';

describe('Controller: CommitsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('netflixinterviewApp'));

  var CommitsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommitsctrlCtrl = $controller('CommitsctrlCtrl', {
      $scope: scope
    });
  }));

});
