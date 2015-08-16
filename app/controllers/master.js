ng.module('app').controller('master', [
  '$scope', '$rootScope', 'auth', 'api', 'socket',
  function ($scope, $rootScope, auth, api, socket) {
    auth.load();

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.user = auth.getUser;
    $scope.token = auth.getToken;

    $scope.$on('loggedIn', function ($ev) {
      socket.connect($scope.user().cogent_agent_id);
      api.setCommonHeader('Token', $scope.token());
    });

    $scope.$on('unauthorized', function ($ev) {
      auth.logout();
    });

    $scope.$on('loggedOut', function (ev) {
      socket.disconnect();
    });

    if ($scope.isLoggedIn()) {
      $rootScope.$broadcast('loggedIn');
    }
  }
]);