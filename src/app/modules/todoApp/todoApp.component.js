'use strict';
import todoAppTemplate from './todoApp.html';

function todoAppComponentController(todoAppService) {
  const vm = this;
  vm.$onInit = onInit;
  vm.addTodo = addTodo;

  function onInit() {
    vm.title = "Todo app!";
    loadTodoItems();
  }

  function addTodo(todo) {
    todoAppService.save(todo);
    loadTodoItems();
  }

  function loadTodoItems() {
    vm.todoList = todoAppService.getAll();
  }
}
todoAppComponentController.$inject = ['todoAppService'];

export default {
  template: todoAppTemplate,
  controller: todoAppComponentController,
  controllerAs: 'vm'
}