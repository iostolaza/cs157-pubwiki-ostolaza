
// public/js/controllers/signinController.js

wikiApp.controller("signinController", function($scope, $http, $location) {
  $scope.user = { email: "", password: "" };
  $scope.error = null;
  $scope.success = null;

  $scope.login = function () {
    if (!$scope.user.email || !$scope.user.password) {
      $scope.error = "Please enter email and password.";
      return;
    }
    $http.post("/api/user/login", $scope.user)
        .then(function (response) {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          $scope.success = "Login successful!";
          setTimeout(function() {
            $scope.$apply(() => $location.path('/'));
          }, 1200);
        })
      .catch(function (error) {
        $scope.error = (error.data && error.data.error) ? error.data.error : "Login failed.";
      });
  };
});
