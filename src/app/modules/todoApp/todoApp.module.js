'use strict';

import todoAppComponent from './todoApp.component';
import todoAppRepository from './todoApp.service';

export default angular
  .module('todoApp', [])
  .component('todoApp', todoAppComponent)
  .service('todoAppRepository', todoAppRepository)
  .name;