'use strict';
import angular from 'angular';

/** Dependencies modules imports */
import todoInput from './components/todoInput/todoInput.module';
import todoApp from './modules/todoApp/todoApp.module';

export default (() => {
  return angular.module('app', [
    todoInput,
    todoApp
  ])
})();
