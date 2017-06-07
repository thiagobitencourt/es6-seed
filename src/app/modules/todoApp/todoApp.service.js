'use strict';

function todoAppService() {
  let todoList;
  _onInit();

  const todoService = {
    save, remove, getAll
  }
  return todoService;

  function _onInit() {
    // TODO: Load list from some where
    todoList = [];
  }

  function _persistList() {
    // TODO
  }
  /**
   * Save a todo to the list, add an id to it incrementing the last used id
   * 
   * @param todo the object to be saved
   */
  function save(todo) {
    const lastTodoItem = todoList[todoList.length - 1];
    const lastId = (lastTodoItem && lastTodoItem.id) || 0;
    todo.id = (lastId + 1);
    todoList.push(todo);
  }
  /**
   * Set the todo item as done
   */
  function done(todo) {
    todo.done = true;
  }
  /**
   * Remove the todo item from the list
   */
  function remove(todo) {
    const idx = todoList.indexOf(todo);
    if(idx !== -1)
      todoList.splice(idx, 1);
  }

  function getAll() {
    return Object.assign([], todoList);
  }
}

export default todoAppService;