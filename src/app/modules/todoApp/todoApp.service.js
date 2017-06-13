'use strict';

// Angular free
function todoAppRepository() {
  const storageKey = 'todoApp.items';
  let todoList;

  const todoService = {
    save, remove, done, getAll
  }
  return todoService;

  function _obtainList() {
    if(!todoList) {
      const fromStorage = localStorage.getItem(storageKey) || [];
      if(typeof fromStorage === 'string') {
        todoList = JSON.parse(fromStorage);
      } else {
        todoList = []
      }
    }
    return todoList;
  }

  function _persistList(list) {
    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  /**
   * Save a todo to the list, add an id to it incrementing the last used id
   * 
   * @param todo the object to be saved
   */
  function save(todo) {
    const list = _obtainList();
    const lastTodoItem = list[list.length - 1];
    const lastId = (lastTodoItem && lastTodoItem.id) || 0;

    todo.id = (lastId + 1);
    list.push(todo);
    _persistList(list);
  }
  /**
   * Set the todo item as done
   */
  function done(id) {
    const list = _obtainList();
    const todo = list.find(item => item.id === id)
    if(todo) {
      todo.done = true;
      _persistList(list);
    }
  }
  /**
   * Remove the todo item from the list
   */
  function remove(id) {
    const list = _obtainList();
    const todo = list.find(item => item.id === id)
    if(todo) {
      const idx = list.indexOf(todo);
      list.splice(idx, 1);
      _persistList(list);
    }
  }

  function getAll() {
    const list = _obtainList();
    return Object.assign([], list);
  }
}

export default todoAppRepository;