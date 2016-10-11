export default (() => {
  'use strict';

  class ControllerClass {
    constructor(ServiceClass) {
      this.ServiceClass = ServiceClass;
      this.name = 'A controller using class';
    }

    $onInit() {
      this.ServiceClass.getAnyValue();
    }

    setName(newName) {
        this.name = newName;
    }
  }

  return ControllerClass;
})();
