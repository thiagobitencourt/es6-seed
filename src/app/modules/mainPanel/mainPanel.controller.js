export default (() => {
  'use strict';

  class mainPanelController {
    constructor(mainPanelService) {
      this.mainPanelService = mainPanelService;
      let username = 'Guest'; 
      this.hello = `Wellcome ${username}`;
    }

    $onInit() {
      this.mainPanelService.serviceFunction('value');
    }
  }

  mainPanelController.$inject = ['mainPanelService'];
  return mainPanelController;
})();