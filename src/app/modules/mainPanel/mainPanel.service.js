export default (() => {
  'use strict';

  function mainPanelService() {
    let serviceAttr = 'Attribute for the service';
    let service = { serviceFunction, serviceAttr };
    function serviceFunction(value) {
      serviceAttr = value;
      return serviceAttr;
    }
    return service;
  };

  mainPanelService.$inject = [];
  return mainPanelService;
})();
