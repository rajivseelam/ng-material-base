ng.module('app').controller(
  'login', [
    '$scope', '$timeout', 'auth',
    function ($scope, $timeout, auth) {
      $scope.loginData = {
        contact_number: ''
      };

      $scope.showErrorMsg = false;

      $scope.errors = {
        contact_number: null
      };

      $scope.attemptLogin = function () {
        auth.login($scope.loginData);
        $timeout(function () {
          $scope.showErrorMsg = true;
        }, 3000)
      };
    }
  ]
);