'use strict';
import todoAppTemplate from './todoApp.html';

function todoAppComponentController(todoAppRepository) {
  const vm = this;
  vm.$onInit = onInit;
  vm.addTodo = addTodo;

  vm.setItemAsDone = setItemAsDone;
  vm.removeItem = removeItem;

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

  function setItemAsDone({ id }) {
    todoAppRepository.done(id);
    loadTodoItems();
  }

  function removeItem({ id }) {
    todoAppRepository.remove(id);
    loadTodoItems();
  }
}
todoAppComponentController.$inject = ['todoAppRepository'];

export default {
  template: todoAppTemplate,
  controller: todoAppComponentController,
  controllerAs: 'vm'
}