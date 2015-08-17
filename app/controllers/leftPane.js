ng.module('app').controller('leftPane', [
  '$scope',
  function ($scope) {
    $scope.customer = {
      name: 'Abhinav Yadav'
    };

    $scope.addresses = [
      'Hauz Khas',
      'Green Park',
      'Lodhi Garden'
    ];

    
  }
]);