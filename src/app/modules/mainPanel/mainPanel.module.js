/** Import dependencies */
import mainPanelService from './mainPanel.service';
import mainPanelController from './mainPanel.controller';
/** Define and export module */
export default
(() => {
  'use strict';
  return angular
  .module('mainPanel', [])
    .service('mainPanelService', mainPanelService)
    .controller('mainPanelController', mainPanelController)
    .name;
})();