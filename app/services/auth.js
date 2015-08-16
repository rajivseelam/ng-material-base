ng.module('app')
  .provider('auth', [
    'config',
    function (config) {
      this['$get'] = [
        '$rootScope', 'api',
        function ($rootScope, api) {
          var user = null;
          var token = null;

          var store = function (user, token) {
            localStorage.setItem('auth.user', JSON.stringify(user));
            localStorage.setItem('auth.token', token.toString());
          };

          var load = function () {
            if (localStorage.getItem('auth.token')) {
              token = localStorage.getItem('auth.token');
              api.setCommonHeader('Token', token.toString());
            }
            if (localStorage.getItem('auth.user')) {
              user = JSON.parse(localStorage.getItem('auth.user'));
            }
          };

          var unload = function () {
            token = null;
            user = null;
            localStorage.removeItem('auth.token');
            localStorage.removeItem('auth.user');
            api.unsetCommonHeader('Token');
          };

          var getUser = function () {
            return user;
          };

          var getToken = function () {
            return token;
          }
          
          var login = function (data) {
            return api.post('/agent_login', {
              data: data
            }).then(
              function (data) {
                store(data.user, data.access_token);
                load();
                $rootScope.$broadcast('loggedIn');
                data;
              },
              function (res) {
                unload();
                $rootScope.$broadcast('loginFailed', res);
              }
            );
          };

          var logout = function () {
            unload();
            $rootScope.$broadcast('loggedOut');
          };

          $rootScope.$on('unauthorized', function ($ev) {
            if (user !== null || token !== null) {
              logout();
            }
          });

          return {
            load: load,
            getUser: getUser,
            getToken: getToken,
            isLoggedIn: function () {
              return user !== null && token !== null;
            },
            login: login,
            logout: logout
          };
        }
      ];
    }
  ])