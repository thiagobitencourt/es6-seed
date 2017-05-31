'use strict';
import angular from 'angular';

/** Dependencies modules imports */
import mainPanel from './modules/mainPanel/mainPanel.module';
import classPanel from './modules/classPanel/classPanel.module';

export default (() => {
  return angular.module('app', [
    mainPanel,
    classPanel
  ])
})();
