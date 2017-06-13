'use strict';

import todoAppRepository from '../todoApp.service';

describe('todo app repository', () => {
  let repository;

  // Mock the localStorage behavior
  let todoMockItems;

  function fakeSet(key, items) {
    todoMockItems = items
  }

  function fakeGet(key) {
    return todoMockItems;
  }

  localStorage = {
    setItem: fakeSet,
    getItem: fakeGet
  }

  beforeEach(() => {
    repository = todoAppRepository();
    // spyOn(localStorage, 'setItem').and.callThrought();
  });

  it(' the service should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe(' obtaining the Todo list', () => {

    afterEach(() => {
      todoMockItems = undefined;
    })

    it(' should get the items from the localStorage service', () => {
      spyOn(localStorage, 'getItem').and.stub();
      repository.getAll();
      expect(localStorage.getItem).toHaveBeenCalledWith('todoApp.items');
    });

    it(' should return the found items', () => {
      todoMockItems = JSON.stringify( [{ label: 'item 0' }] );
      spyOn(localStorage, 'getItem').and.returnValue(todoMockItems);
      expect(repository.getAll()).toEqual( JSON.parse(todoMockItems) );
    });

    it(' should return a empty list if none item was found', () => {
      spyOn(localStorage, 'getItem').and.returnValue(undefined);
      expect(repository.getAll()).toEqual([]);
    });

  });

  describe(' on save a new todo item', () => {
    let todoItem = { label: 'new todo item' };

    beforeEach(() => {
      repository = todoAppRepository();
      todoMockItems = undefined;
      localStorage.setItem('todoApp.items', []);

      spyOn(localStorage, 'setItem').and.callThrough();
      spyOn(localStorage, 'getItem').and.callThrough();
      repository.save(todoItem);
    });

    it(' should load the items from the localStorage', () => {
      expect(localStorage.getItem).toHaveBeenCalled();
    });

    it(' should uptade the localStorage', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it(' should set the first ID to it', () => {
      const todoList = repository.getAll();

      expect(todoList[0].id).toBeDefined();
      expect(todoList[0].id).toBe(1);
    });

    it(' should increment the ID based on the last todo item before set to the current one', () => {
      repository.save({ label: 'second item' });
      
      const todoList = repository.getAll();
      expect(todoList.length).toEqual(2);
      
      expect(todoList[0].id).toBeDefined();
      const firstId = todoList[0].id;

      expect(todoList[1].id).toBeDefined();
      expect(todoList[1].id).toBe(firstId + 1);
    });

  });

  describe(' on removing an existing todo item by its ID', () => {
    let todoItem = { label: 'new todo item' };

    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.stub();
      spyOn(localStorage, 'setItem').and.stub();
      repository.save(todoItem);
    });

    it(' should remove the item when found', () => {
      repository.remove(1);
      const list = repository.getAll();
      expect(list).toEqual([]);
    });

    it(' should update the localStorage', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it(' whill do nothing if the todo item is not found', () => {
      repository.remove(356/*random id*/);
      const list = repository.getAll();
      expect(list.length).toBe(1);
    });

  });

  describe(' on set the item as DONE by its ID', () => {
    let todoItem = { label: 'new todo item' };

    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.stub();
      spyOn(localStorage, 'setItem').and.stub();
      repository.save(todoItem);
    });

    it(' should set it as done when found', () => {
      repository.done(1);
      const list = repository.getAll();
      expect(list[0].done).toBe(true);
    });

    it(' should update the localStorage', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it(' whill do nothing if the todo item is not found', () => {
      repository.done(356/*random id*/);
      // expect not to update the localStorage nor the list
    });
  });

})