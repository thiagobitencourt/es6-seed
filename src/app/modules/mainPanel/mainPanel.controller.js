export default (() => {
  'use strict';

  function mainPanelController(mainPanelService) {
    let vm = this;
    let username = 'Guest'; 
    vm.hello = `Wellcome ${username}`;

    mainPanelService.serviceFunction('value');
  }

  mainPanelController.$inject = ['mainPanelService'];
  return mainPanelController;
})();