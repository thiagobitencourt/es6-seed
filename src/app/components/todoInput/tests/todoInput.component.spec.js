'use strict';

import todoInput from '../todoInput.module';

describe('Todo input component', () => {
  let vm, $componentController, bindings;

  beforeEach(angular.mock.module(todoInput));
  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;

    bindings = {
      onAdd: jasmine.createSpy('onAdd')
    }

    vm = $componentController('todoInput', null, bindings);
  }));

  it(' the controller should be defined', () => {
    expect(vm).toBeDefined();
  });

  describe(' on click to add a new to do item', () => {

    it(' shoud call the onAdd function with an object having the label attribute', () => {
      vm.label = "to do label";
      vm.onAddClick();
      expect(bindings.onAdd).toHaveBeenCalledWith({ todo: { label: 'to do label' }});
    });
    
    it(' shoud NOT call the onAdd function with the label attribute set as undefined', () => {
      vm.label = undefined;
      vm.onAddClick();
      expect(bindings.onAdd).not.toHaveBeenCalled();
    });

  });
})