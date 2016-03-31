app.controller("mainCtrl", function($scope,$http,$firebaseArray,$state,$rootScope,$stateParams,$ionicLoading) {
  console.log("in the main controller");
  var bookRef = new Firebase("https://crackling-fire-8350.firebaseio.com/library/");
  var queue = new Firebase("https://dev456.firebaseio.com/search");

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  bookRef.once("value", function(snapshot) {
  var a = snapshot.numChildren();
   console.log(a);
  // c === 0 (since "Fred" is a string)
  });
if(!$scope.books) {
  $scope.books = $firebaseArray(bookRef);
}

console.log($scope.books);

$scope.results = [];

$scope.books.$loaded(
  function(data) {

   $ionicLoading.hide();

 }
 );

$scope.search = function() {

  console.log("searching");

  function searchES(index, type, searchTerm, callback) {
       // post search requests to https://<INSTANCE>.firebaseio.com/search/request
       var reqRef = queue.child('request').push({ index: index, type: type, query: searchTerm });

       // read the replies from https://<INSTANCE>.firebaseio.com/search/response
       queue.child('response/'+reqRef.key()).on('value', function fn(snap) {
          if( snap.val() !== null ) {     // wait for data
             snap.ref().off('value', fn); // stop listening
             snap.ref().remove();         // clear the queue
             callback(snap.val());
           }
         });
     }

     $scope.results = [];
     searchES('firebase', 'book', {query_string: { query: '*' + $scope.term}}, function(data) {
      console.log('searching');
      if( data.hits ) {
        console.log(data);

        for(var i=0; i<data.hits.length; i++) {
          $scope.results.push({$id: data.hits[i]._id, description: data.hits[i]._source.description, image: data.hits[i]._source.image, title: data.hits[i]._source.title})
        }
        $scope.books = "";
        $scope.$apply(function () {
         $scope.books = $scope.results;
       });

      }

      $scope.term = "";
    });

   };
   $scope.term = "";

   $scope.view = function(id) {
    $state.go('show', { "id": id })
  }

})
