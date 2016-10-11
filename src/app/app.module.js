/** Dependencies modules imports */
import mainPanel from './modules/mainPanel/mainPanel.module';
import classPanel from './modules/classPanel/classPanel.module';

export default (() => {
  return angular.module('app', [
    mainPanel,
    classPanel
  ])
  .config(() => {
    let version = "@@VERSION@@";
    localStorage.setItem('es6-seed', version);
    window.version = version;
  });
})();
