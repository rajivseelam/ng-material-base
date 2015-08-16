// translators are functions which translate
// res data into appropriate data structures.
// They can be added to apiProvider via the method translator
// They are only called if the request succeeds and when
// the request method and url pattern matches their own.

ng.module('app')
  .provider('api', [
    'config',
    function (config) {
      var translators = [];
      var headers = {};

      this.setCommonHeader = function (key, val) {
        headers[key] = val;
        return this;
      };

      this.unsetCommonHeader = function (key) {
        delete headers[key];
        return this;
      }

      this.translator = function (translator) {
        translators.push(translator);
        return this;
      };

      // declaring like this to avoid minification conflict
      this['$get'] = [
        '$http', '$injector',
        function ($http, $injector) {
          var resolvedTranslators = translators.map(function (translator) {
            return $injector.invoke(translator);
          });

          var api = function (method, url, options) {

            options.url = url.indexOf('http') === 0 ? url : config.api.url(url) + '/';
            options.method = method;
            return $http(options).then(function (res) {
              var data = res.data;

              for (var i=0;i<resolvedTranslators.length;i++) {
                var translator = resolvedTranslators[i];

                if (! ng.isFunction(translator.test)) {
                  translator.test = function (method, url, options) {
                    return method === this.method && this.pattern.test(url);
                  };
                }

                if (translator.test(method, url, options)) {
                  return translator.translate(data);
                }
              }

              return data;
            });
          };

          ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (method) {
            api[method.toLowerCase()] = function (url, options) {
              return api(method, url, options);
            };
          });

          api.setCommonHeader = function (key, val) {
            $http.defaults.headers.common[key] = headers[key];
          };

          api.unsetCommonHeader = function (key) {
            delete $http.defaults.headers[key];
          };

          Object.keys(headers).forEach(function (key) {
            api.setCommonHeader(key, val);
          });

          return api;
        }
      ];
    }
  ])
;