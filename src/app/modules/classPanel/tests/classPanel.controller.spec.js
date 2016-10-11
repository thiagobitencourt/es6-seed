import controllerClass from '../classPanel.controller';
import serviceClass from '../classPanel.service';

describe('Class panel controller', () => {
  let $controller, ClassService, ClassController;

  /*
    Create a mock for our angular module, with this line we are creating a new angular instance
    that will be use to run code
  */
  // beforeEach(angular.mock.module('app.classPanel')); //This stopped to work, no idea why

  beforeEach(() => {
    //Injecting the serviceClass dependency
    /*
     First Way:
      One way to instantiate the service class
      You can use this if you will only spy ont he service class intead of use this methods.
      Because you are not injecting the its dependencies.

      Of course, you can create a spy for each of its dependencies,
      but it is work that perhaps it's not worth
    */
    // ClassService = new serviceClass();

    /*
    Second way:
      Other way to instantiate the service class.
      This second one is preferrable because the angular already resolves its dependencies.

      To use this, you can inject the service by its name at the beforeEach block that follows.
      Here we are creating a new service and passing to it the ServiceClass constructor
    */
    angular.mock.module(function($provide) {
      $provide.service('ServiceClass', serviceClass);
    });
  });

  beforeEach(inject((_$controller_, _ServiceClass_ /* Use this if you are using the second way to inject the service*/) => {
    ClassService = _ServiceClass_; // And also do this only for the second way

    $controller = _$controller_;

    ClassController = $controller(controllerClass, {ServiceClass: ClassService});
  }));

  it('should be defined', () => {
    expect(ClassController).toBeDefined();
  });

  it('should have a name', () => {
    ClassController.$onInit();
    expect(ClassController.name).toEqual('A controller using class');
  });

  it('should call a function from the Service', () => {
    spyOn(ClassService, 'getAnyValue');
    ClassController.$onInit();
    expect(ClassService.getAnyValue).toHaveBeenCalled();
  });

  it('should set a new name', () => {
    let newName = 'setting a new name';
    ClassController.setName(newName);
    expect(ClassController.name).toEqual(newName);
  });
});
