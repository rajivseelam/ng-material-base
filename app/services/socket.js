ng.module('app')
  .provider('socket', [
    'config',
    function (config) {
      var stream = new PushStream({
        host: config.pushstream.host,
        port: config.pushstream.port,
        modes: config.pushstream.modes
      });

      // declaring like this to avoid minification issues
      this['$get'] = [
        '$rootScope',
        function ($rootScope) {
          var socket = {
            connect: function (cogentAgentId) {
              stream.addChannel(cogentAgentId);
              stream.connect();

              stream._onmessage(function (data) {
                $rootScope.$broadcast('socket:data', data);
              });
            },

            disconnect: function () {
              stream.disconnect();
            }
          };

          return socket;
        }
      ];
    }
  ]);