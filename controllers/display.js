wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {

  // Controller for display view
  // this will be the urlName for your page

  // Notes:
  // Make an GET ajax call to endpoint and pass in the urlName
  // The result will contain the html that should get assigned to $scope.html
  // $scope.title = response.data.title
  // $scope.html = response.data.html
  // ..
  const urlName = $routeParams.urlName;

  // Initialize variables
  $scope.title = '';
  $scope.html = '';
  $scope.hitCount = 0;
  $scope.loading = true;

  $http.get(`/api/wiki/${urlName}`)
    .then(function (response) {
      $scope.title = response.data.title;
      $scope.html = $sce.trustAsHtml(response.data.html);
      $scope.hitCount = response.data.hitCount;
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);

    })
    .finally(function () {
      $scope.loading = false;
    });
  });