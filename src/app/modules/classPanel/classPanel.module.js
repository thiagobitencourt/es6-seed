import ControllerClass from './classPanel.controller';
import ServiceClass from './classPanel.service';

export default (() => {
  'use strict';

  return angular.module('app.classPanel', [])
    .controller('controllerClass', ControllerClass)
    .service('ServiceClass', ServiceClass)
    .name;
})();
