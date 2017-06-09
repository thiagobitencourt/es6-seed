'use strict';

import todoInputTemplate from './todoInput.html';

function todoInputController()  {
  const vm = this;
  vm.onAddClick = onAddClick;

  function onAddClick() {
    if(vm.label) {
      const todo = { label: vm.label };
      vm.label = null;
      vm.onAdd({ todo });
    }
  }
}

export default {
  template: todoInputTemplate,
  controller: todoInputController,
  controllerAs: 'vm',
  bindings: {
    onAdd: '&'
  }
}