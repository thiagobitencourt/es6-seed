'use strict';

// Angular free
function todoAppRepository() {
  let todoList;

  const todoService = {
    save, remove, done, getAll
  }
  return todoService;

  function _obtainList() {
    // TODO: Load list from some where
    todoList = todoList || [];
    return todoList;
  }

  function _persistList() {
    // TODO
  }

  function _getById(id) {
    const list = _obtainList();
    return list.find(item => item.id === id)
  }

  /**
   * Save a todo to the list, add an id to it incrementing the last used id
   * 
   * @param todo the object to be saved
   */
  function save(todo) {
    const list = _obtainList();
    const lastTodoItem = list[todoList.length - 1];
    const lastId = (lastTodoItem && lastTodoItem.id) || 0;

    todo.id = (lastId + 1);
    list.push(todo);
    _persistList();
  }
  /**
   * Set the todo item as done
   */
  function done(id) {
    const todo = _getById(id);
    if(todo) {
      todo.done = true;
      _persistList();
    }
  }
  /**
   * Remove the todo item from the list
   */
  function remove(id) {
    const todo = _getById(id);
    if(todo) {
      const list = _obtainList();
      const idx = list.indexOf(todo);
      todoList.splice(idx, 1);
    }
  }

  function getAll() {
    const list = _obtainList();
    return Object.assign([], list);
  }
}

export default todoAppRepository;