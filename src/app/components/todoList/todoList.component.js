'use strict';

import todoListTemplate from './todoList.html';

function todoListController() {
  const vm = this;
}

export default {
  template: todoListTemplate,
  controller: todoListController,
  controllerAs: 'vm',
  bindings: {
    items: '=',
    remove: '&',
    done: '&'
  }
}