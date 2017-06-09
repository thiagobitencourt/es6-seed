'use strict';

import todoApp from '../todoApp.module';

describe(' todo App main component', () => {
  let vm, todoAppRepository,
    $scope, $componentController;
  beforeEach(angular.mock.module(todoApp));

  beforeEach(inject((_$componentController_, _$rootScope_, _todoAppRepository_) => {
    $componentController = _$componentController_;
    $scope = _$rootScope_.$new();
    todoAppRepository = _todoAppRepository_;

    vm = $componentController('todoApp', todoAppRepository, {})
  }));

  beforeEach(() => {
    spyOn(todoAppRepository, 'getAll').and.returnValue([]);
    spyOn(todoAppRepository, 'save').and.stub();
  })

  it(' the controller should be defined', () => {
    expect(vm).toBeDefined();
  });

  describe(' on initialize the component', () => {

    beforeEach(() => {
      vm.$onInit();
    });

    it(' should have a title', () => {
      expect(vm.title).toBeDefined();
    });

    it(' should load all the todos items', () => {
      expect(todoAppRepository.getAll).toHaveBeenCalled();
    });

    it(' should set the list with the result', () => {
      expect(vm.todoList).toBeDefined();
      expect(vm.todoList).toEqual([]);
    });

  });

  describe(' on add a new todo item', () => {
    let newTodoItem = { labe: 'new todo' };
    beforeEach(() => {
      vm.addTodo(newTodoItem);
    })

    it(' should save the item on the repository', () => {
      expect(todoAppRepository.save).toHaveBeenCalledWith(newTodoItem);
    });

    it(' should reload all items', () => {
      expect(todoAppRepository.getAll).toHaveBeenCalled();
    });

  });

});