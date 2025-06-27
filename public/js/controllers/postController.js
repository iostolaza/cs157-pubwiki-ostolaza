
// public/js/controllers/postController.js

wikiApp.controller("postController", function ($scope, $http, $routeParams, $location) {
  // Initialize status messages
  $scope.error = null;
  $scope.success = null;

  // Load categories for the dropdown
  $http.get("/api/categories")
    .then(function (response) {
      $scope.categories = response.data;
    })
    .catch(function (error) {
      $scope.error = "Could not load categories.";
      $scope.categories = [];
    });

  // CKEditor setup
  function initCKEditor() {
    ClassicEditor.create(document.querySelector("#editor"), { })
      .then(editor => {
        window.editor = editor;
        editorReady();
      })
      .catch(error => {
        $scope.error = "CKEditor failed to load.";
        console.error(error);
      });
  }
  initCKEditor();

  // Load an existing wiki if editing, otherwise prepare empty
  function editorReady() {
    window.editor.setData(""); 
    if ($routeParams.urlName) {
      $http.get(`/api/wiki/${$routeParams.urlName}`)
        .then(function (response) {
          $scope.title = response.data.title;
          $scope.category = response.data.category;
          $scope.author = response.data.author;
          $scope.urlName = response.data.urlName;
    
          window.editor.setData(response.data.html);
        })
        .catch(function (error) {
          $scope.error = "Could not load wiki for editing.";
        });
    }
  }

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
      managementPassword: $scope.managementPassword,
      agreeToTerms: $scope.agreeToTerms,
      password: $scope.managementPassword 
    };

    // Edit mode: PATCH, otherwise POST
    if ($routeParams.urlName) {
      $http.patch(`/api/wiki/${$routeParams.urlName}`, wikiData)
        .then(function (response) {
          $scope.success = "Wiki updated!";
        })
        .catch(function (error) {
          $scope.error = (error.data && error.data.error) ? error.data.error : "Error updating wiki.";
        });
    } else {
      $http.post("/api/wiki", wikiData)
        .then(function (response) {
          $scope.success = "Wiki created!";
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
    var pw = prompt("Enter password to delete this wiki:");
    if (!pw) return;
    $http({
        method: 'DELETE',
        url: `/api/wiki/delete/${$routeParams.urlName}`,
        data: { password: pw },
        headers: { 'Content-Type': 'application/json' }
      })
    .then(function (response) {
      $scope.success = "Wiki deleted!";
      setTimeout(() => $location.path("/"), 1200);
    })
    .catch(function (error) {
      $scope.error = (error.data && error.data.error) ? error.data.error : "Delete failed.";
    });
  };
});
