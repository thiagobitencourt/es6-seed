/** Dependencies modules imports */
import './modules/mainPanel/mainPanel.module';

export default (() => {
  return angular.module('app', [
    'mainPanel'
  ]);
})();