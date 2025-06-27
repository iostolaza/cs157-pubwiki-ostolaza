
// public/js/controllers/displayController.js

wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce, $location) {
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
      $scope.urlName = urlName;
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

  // Delete wiki
  $scope.deleteWiki = function () {
    var pw = prompt(`Enter password to delete "${$scope.urlName}" wiki:`);
    if (!pw) return;
    $http({
      method: 'DELETE',
      url: `/api/wiki/delete/${$scope.urlName}`,
      data: { password: pw },
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function (response) {
      $scope.success = "Wiki deleted! Redirecting to homepage...";
      setTimeout(function() {
        $scope.$apply(() => $location.path('/'));
      }, 1500);
    })
    .catch(function (error) {
      $scope.error = (error.data && error.data.error) ? error.data.error : "Delete failed.";
    });
  };
}); 
