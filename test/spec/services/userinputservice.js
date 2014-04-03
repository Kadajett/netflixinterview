'use strict';

describe('Service: Userinputservice', function () {

  // load the service's module
  beforeEach(module('netflixinterviewApp'));

  // instantiate service
  var Userinputservice;
  beforeEach(inject(function (_Userinputservice_) {
    Userinputservice = _Userinputservice_;
  }));

  it('should do something', function () {
    expect(!!Userinputservice).toBe(true);
  });

});
