'use strict';
import angular from 'angular';

/** Dependencies modules imports */
import mainPanel from './modules/mainPanel/mainPanel.module';
import classPanel from './modules/classPanel/classPanel.module';
import myComponent from './modules/myComponent/myComponent.module';

export default (() => {
  return angular.module('app', [
    mainPanel,
    classPanel,
    myComponent
  ])
})();
