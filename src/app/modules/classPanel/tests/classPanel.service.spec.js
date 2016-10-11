import serviceClass from '../classPanel.service';

describe('Class panel service', () => {
  let $httpBackend, $timeout, $q;
  let Service;

  // beforeEach(angular.mock.module('app.classPanel'));
  /* See classPanel.controller.spec.js for some explanation os this */
  beforeEach(angular.mock.module(($provide) => {
    $provide.service('ServiceClass', serviceClass);
  }));

  beforeEach(inject((_$httpBackend_, _$timeout_, _$q_, _ServiceClass_) => {
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
    $q = _$q_;

    Service = _ServiceClass_;
  }));

  it('should be defined', () => {
    expect(Service).toBeDefined();
  });

  it('should call a API', () => {
    $httpBackend.whenGET('http://localhost/api/call').respond(200, {result: true});

    Service.backendCall();

    $httpBackend.flush();
    expect(Service.fromBackend).toEqual({result: true});
  });

  it('should set a variable value after a timeout', () => {
    Service.afterTime();
    $timeout.flush();
    expect(Service.timeValue).toEqual('value after a time');
  });
});
