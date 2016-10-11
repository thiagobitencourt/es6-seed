export default (() => {
  'use strict';

  class ServiceClass {
    constructor($http, $timeout) {
      this.$http = $http;
      this.$timeout = $timeout;
    }

    getAnyValue() {
      return 'AnyValue';
    }

    backendCall() {
      this.$http.get('http://localhost/api/call')
        .then((result) => {
          this.fromBackend = result.data;
        });
    }

    afterTime() {
      this.$timeout(() => {
        this.timeValue = 'value after a time';
      });
    }
  }

  ServiceClass.$inject = ['$http', '$timeout'];
  return ServiceClass;
})();
