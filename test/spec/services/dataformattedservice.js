'use strict';

describe('Service: Dataformattedservice', function () {

  // load the service's module
  beforeEach(module('netflixinterviewApp'));

  // instantiate service
  var Dataformattedservice;
  beforeEach(inject(function (_Dataformattedservice_) {
    Dataformattedservice = _Dataformattedservice_;
  }));

  it('should do something', function () {
    expect(!!Dataformattedservice).toBe(true);
  });

});
