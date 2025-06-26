wikiApp.controller("registerController", function($scope, $http) {
  // Controller for registration view (extra credit)
  // Initialize user object in $scope
  $scope.user = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Function to handle user registration
  $scope.register = function () {
    // Validate input (you might want to add more validation)
    if (!$scope.user.username || !$scope.user.email || !$scope.user.password || !$scope.user.confirmPassword) {
      // Handle validation error
      console.error("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if ($scope.user.password !== $scope.user.confirmPassword) {
      // Handle password mismatch error
      console.error("Passwords do not match.");
      return;
    }

    // Prepare data for registration
    const registrationData = {
      username: $scope.user.username,
      email: $scope.user.email,
      password: $scope.user.password,
    };

    // Make AJAX call to register endpoint
    $http.post("/api/register", registrationData)
      .then(function (response) {
        // Handle successful registration
        console.log("User registered successfully:", response.data);

        // Optionally, you can redirect the user to another page
        // window.location = "/login";
      })
      .catch(function (error) {
        // Handle registration error
        console.error("Error registering user:", error.data);
      });
  };

});