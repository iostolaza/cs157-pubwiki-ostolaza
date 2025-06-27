
// public/js/controllers/displayController.js

wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  const urlName = $routeParams.urlName;
  $scope.title = '';
  $scope.html = '';
  $scope.author = '';
  $scope.category = '';
  $scope.pageViews = 0;
  $scope.createdDate = '';
  $scope.updatedDate = '';
  $scope.loading = true;

  $http.get(`/api/wiki/${urlName}`)
    .then(function (response) {
      $scope.title = response.data.title;
      $scope.html = $sce.trustAsHtml(response.data.html);
      $scope.author = response.data.author;
      $scope.category = response.data.category;
      $scope.pageViews = response.data.pageViews;
      $scope.createdDate = response.data.createdDate;
      $scope.updatedDate = response.data.updatedDate;
    })
    .catch(function (error) {
      $scope.error = "Error fetching data.";
    })
    .finally(function () {
      $scope.loading = false;
    });
});
