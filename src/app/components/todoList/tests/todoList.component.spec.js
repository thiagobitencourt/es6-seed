'use strict';

import todoList from '../todoList.module';

describe(' Todo list component', () => {
  let $componentController, 
    bindings, vm;
  
  beforeEach(angular.mock.module(todoList));
  beforeEach(inject(_$componentController_ => {
    $componentController = _$componentController_;

    bindings = {
      items: [],
      remove: jasmine.createSpy('remove'),
      done: jasmine.createSpy('done')
    };

    vm = $componentController('todoList', {}, bindings);
  }));

  it(' should initialize the component', () => {
    expect(vm).toBeDefined();
  })

})