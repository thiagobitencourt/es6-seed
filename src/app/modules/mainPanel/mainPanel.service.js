export default (() => {
  'use strict';

  class mainPanelService {
    constructor() {
      this.serviceAttr = 'Attribute for the service';
    }

    serviceAttr() {
      return this.serviceAttr;
    }    

    serviceFunction(value) {
      this.serviceAttr = value;
    }
  };
  // function mainPanelService() {
  //   let serviceAttr = 'Attribute for the service';
  //   let service = { serviceFunction, serviceAttr };
  //   function serviceFunction(value) {
  //     serviceAttr = value;
  //   }
  //   return service;
  // };
  mainPanelService.$inject = [];
  return mainPanelService;
})();