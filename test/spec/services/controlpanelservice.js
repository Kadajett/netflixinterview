'use strict';

describe('Service: Controlpanelservice', function () {

  // load the service's module
  beforeEach(module('netflixinterviewApp'));

  // instantiate service
  var Controlpanelservice;
  beforeEach(inject(function (_Controlpanelservice_) {
    Controlpanelservice = _Controlpanelservice_;
  }));

  it('should do something', function () {
    expect(!!Controlpanelservice).toBe(true);
  });

});
