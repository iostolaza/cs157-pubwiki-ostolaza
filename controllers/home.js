
// Controller for home view
wikiApp.controller("homeController", function ($scope, $http) {
  // event handler for the search button
  // $http.get() to your search endpoint
  // the result will be an array of objects, assign this to a scope var
  // $scope.searchResults = ...
  $scope.searchTerm = '';
  $scope.searchResults = [];

  $scope.search = function () {

    if ($scope.searchTerm.trim() !== '') {
      $http.get(`/api/wiki/search/${$scope.searchTerm}`)
        .then(function (response) {
          console.log("Search results:", response.data);
          $scope.searchResults = response.data;
        })
        .catch(function (error) {
          console.error("Error fetching search results:", error);
        });
    } else {

      console.log('Please enter a search term');
    }
  };

  $scope.search();
});
