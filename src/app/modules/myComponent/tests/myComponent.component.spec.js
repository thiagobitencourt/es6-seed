'use strict';

import myComponent from '../myComponent.module';

describe('My component controller', () => {
  let vm, $componentController;
  
  beforeEach(angular.mock.module(myComponent));

  beforeEach(inject(_$componentController_ => {
    $componentController = _$componentController_;

    vm = $componentController('myComponent', null);
  }));

  it(' should be defined', () => {
    expect(vm).toBeDefined();
  });

  it(' should have an initial label', () => {
    expect(vm.label).toBeDefined();
  });

});