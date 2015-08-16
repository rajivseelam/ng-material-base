;

window.ng = window.angular;

var app = ng.module('app', ['ngMaterial', 'ngAnimate', 'angular-loading-bar']);

app.constant('config', {
  api: {
    base: 'http://api.gonomnom.in',
    url: function (slug) {
      return this.base + slug;
    }
  },
  pushstream: {
    host: 'api.gonomnom.in',
    port: 9080,
    modes: 'websocket|eventsource|stream'
  }
});

app.config([
  '$httpProvider', 'cfpLoadingBarProvider',
  function ($httpProvider, cfpLoadingBarProvider) {
    $httpProvider.defaults.headers.common['X-Device-Id'] = 'web';
    $httpProvider.defaults.headers.common['X-Device-Type'] = 'browser';
    $httpProvider.defaults.headers.common['X-Push-Id'] = 'random';

    cfpLoadingBarProvider.includeSpinner = false;
    
    $httpProvider.interceptors.push([
      '$q', '$rootScope',
      function ($q, $rootScope) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401 : $rootScope.$broadcast('unauthorized', rejection); break;
              case 403 : $rootScope.$broadcast('forbidden', rejection); break;
              default  : console.log(rejection)
            }
            
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);