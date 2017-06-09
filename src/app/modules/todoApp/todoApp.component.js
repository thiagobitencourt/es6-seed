'use strict';
import todoAppTemplate from './todoApp.html';

function todoAppComponentController(todoAppRepository) {
  const vm = this;
  vm.$onInit = onInit;
  vm.addTodo = addTodo;

  function onInit() {
    vm.title = "Todo app!";
    loadTodoItems();
  }

  function addTodo(todo) {
    todoAppRepository.save(todo);
    loadTodoItems();
  }

  function loadTodoItems() {
    vm.todoList = todoAppRepository.getAll();
  }
}
todoAppComponentController.$inject = ['todoAppRepository'];

export default {
  template: todoAppTemplate,
  controller: todoAppComponentController,
  controllerAs: 'vm'
}