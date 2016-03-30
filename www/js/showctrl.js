app.controller("showCtrl", function($scope,$state,$stateParams,$firebaseObject,$ionicViewSwitcher) {

  console.log("in the show controller");

  console.log("this! " + $stateParams.id);

  var showRef = new Firebase("https://crackling-fire-8350.firebaseio.com/library/" +$stateParams.id);
  $scope.view = $firebaseObject(showRef)
  $scope.description = "";

   $scope.swiperightAction = function() {
      $ionicViewSwitcher.nextDirection('back');
        $state.go('start');
    }

})
