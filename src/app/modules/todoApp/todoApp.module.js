'use strict';

import todoAppComponent from './todoApp.component';
import todoAppService from './todoApp.service';

export default angular
  .module('todoApp', [])
  .component('todoApp', todoAppComponent)
  .service('todoAppService', todoAppService)
  .name;