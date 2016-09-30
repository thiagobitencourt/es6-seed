/** Dependencies modules imports */
import './modules/mainPanel/mainPanel.module';

export default (() => {
  return angular.module('app', [
    'mainPanel'
  ])
  .config(() => {
    let version = "@@VERSION@@";
    localStorage.setItem('es6-seed', version);
    window.version = version;
  });
})();