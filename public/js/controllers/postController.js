
// public/js/controllers/postController.js

wikiApp.controller("postController", function ($scope, $http, $routeParams, $location) {
  $scope.error = null;
  $scope.success = null;
  $scope.urlName = $routeParams.urlName || ""; 

//   // New check
//   if (!localStorage.getItem('jwt')) {
//   alert("You must be signed in to post or edit a Wiki.");
//   $location.path('/signin');
// }

  // Load categories
  $http.get("/api/categories")
    .then(function (response) {
      $scope.categories = response.data;
    })
    .catch(function (error) {
      $scope.error = "Could not load categories.";
      $scope.categories = [];
    });

  // CKEditor setup
  function initCKEditorAndMaybePrefill() {
    ClassicEditor.create(document.querySelector("#editor"), {})
      .then(editor => {
        window.editor = editor;
        // If editing, fetch existing wiki and prefill
        if ($scope.urlName) {
          $http.get(`/api/wiki/${$scope.urlName}`)
            .then(function (response) {
              $scope.title = response.data.title;
              $scope.category = response.data.category;
              $scope.author = response.data.author;
              // $scope.urlName already set
              window.editor.setData(response.data.html);
              // Use $apply to update bindings if needed
              if(!$scope.$$phase) $scope.$apply();
              console.log('Prefill data:', response.data);

            })
            .catch(function (error) {
              $scope.error = "Could not load wiki for editing.";
            });
        } else {
          window.editor.setData(""); // New post
        }
      })
      .catch(error => {
        $scope.error = "CKEditor failed to load.";
        console.error(error);
      });
  }
  // Run setup on controller load
  initCKEditorAndMaybePrefill();

  // Helper to get HTML content from editor
  function getHtml() {
    return window.editor.getData();
  }

  // Save (Create or Update) Wiki
  $scope.saveWiki = function () {
    $scope.error = null;
    $scope.success = null;

    if (!$scope.title || !$scope.category || !$scope.author || !$scope.urlName || !getHtml()) {
      $scope.error = "All fields are required!";
      return;
    }
    if (!$scope.managementPassword) {
      $scope.error = "Password is required for saving!";
      return;
    }
    if (!$scope.agreeToTerms) {
      $scope.error = "You must agree to terms to continue.";
      return;
    }

    const wikiData = {
      title: $scope.title,
      category: $scope.category,
      author: $scope.author,
      urlName: $scope.urlName,
      html: getHtml(),
      password: $scope.managementPassword
    };

  // Edit mode: PATCH
  if ($routeParams.urlName) {
    $http.patch(`/api/wiki/${$scope.urlName}`, wikiData)
      .then(function (response) {
        $scope.success = "Wiki updated! Redirecting to homepage...";
        setTimeout(function() {
          $scope.$apply(() => $location.path('/'));
        }, 1500);
      })
      .catch(function (error) {
        $scope.error = (error.data && error.data.error) ? error.data.error : "Error updating wiki.";
      });
  }  else {
    $http.post("/api/wiki", wikiData)
      .then(function (response) {
        $scope.success = "Wiki created! Redirecting to homepage...";
        setTimeout(function() {
          $scope.$apply(() => $location.path('/'));
        }, 1500);
      })
      .catch(function (error) {
        $scope.error = (error.data && error.data.error) ? error.data.error : "Error creating wiki.";
      });
  }
};

  // Cancel edit - redirect home
  $scope.cancelEdit = function () {
    $location.path("/");
  };

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