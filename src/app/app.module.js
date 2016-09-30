/** Dependencies modules imports */
import mainPanel from './modules/mainPanel/mainPanel.module';

export default (() => {
  return angular.module('app', [
    mainPanel
  ]);
})();