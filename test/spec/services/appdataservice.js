'use strict';

describe('Service: Appdataservice', function () {

  // load the service's module
  beforeEach(module('netflixinterviewApp'));

  // instantiate service
  var Appdataservice;
  beforeEach(inject(function (_Appdataservice_) {
    Appdataservice = _Appdataservice_;
  }));

  it('should do something', function () {
    expect(!!Appdataservice).toBe(true);
  });

});
