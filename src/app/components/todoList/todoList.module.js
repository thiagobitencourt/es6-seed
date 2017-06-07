'use strict';

import todoListComponent from './todoList.component';

export default angular
  .module('todoList', [])
  .component('todoList', todoListComponent)
  .name;