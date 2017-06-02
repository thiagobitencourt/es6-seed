'use strict';
import myComponentTemplate from './myComponent.html';

function myComponentController() {
  const vm = this;

  vm.label = "My component works";
};

export default {
  template: myComponentTemplate,
  controller: myComponentController,
  controllerAs: 'vm'
}