
// public/js/controllers/registerController.js

wikiApp.controller("registerController", function($scope, $http, $location) {
  $scope.user = { username: "", email: "", password: "", confirmPassword: "" };
  $scope.error = null;
  $scope.success = null;

  $scope.register = function () {
    $scope.error = null;
    $scope.success = null;
    if (!$scope.user.username || !$scope.user.email || !$scope.user.password || !$scope.user.confirmPassword) {
      $scope.error = "Please fill in all fields.";
      return;
    }
    if ($scope.user.password !== $scope.user.confirmPassword) {
      $scope.error = "Passwords do not match.";
      return;
    }

    $http.post("/api/register", {
      username: $scope.user.username,
      email: $scope.user.email,
      password: $scope.user.password
    })
      .then(function (response) {
        $scope.success = "Registration successful! Redirecting to sign in...";
        setTimeout(function() {
          $scope.$apply(() => $location.path('/signin'));
        }, 1500);
      })
      .catch(function (error) {
        $scope.error = (error.data && error.data.error) ? error.data.error : "Registration failed.";
      });
  };
});

