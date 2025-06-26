wikiApp.controller("postController", function ($scope, $http, $routeParams) {
  // Controller for post view

  $http.get("/api/categories")
    .then(function (response) {
      // Assuming the server returns an array of categories
      $scope.categories = response.data;
    })
    .catch(function (error) {
      // Handle error if needed
      console.error("Error fetching categories:", error);
    });

  // CKEditor
  initCKEditor();

  function initCKEditor() {
    ClassicEditor.create(document.querySelector("#editor"), {
      toolbar: {
        items: [
          "heading",
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "highlight",
          "removeFormat",
          "|",
          "bold",
          "italic",
          "underline",
          "link",
          "bulletedList",
          "numberedList",
          "todoList",
          "|",
          "outdent",
          "indent",
          "alignment",
          "|",
          "blockQuote",
          "insertTable",
          "imageInsert",
          "mediaEmbed",
          "undo",
          "redo",
          "|",
          "code",
          "codeBlock",
          "htmlEmbed",
          "MathType",
          "ChemType",
          "strikethrough",
          "subscript",
          "superscript",
          "horizontalLine",
        ],
        shouldNotGroupWhenFull: true,
      },
      mediaEmbed: {
        previewsInData: true,
      },
      language: "en",
      image: {
        toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableCellProperties",
          "tableProperties",
        ],
      },
      licenseKey: "",
    })
      .then((editor) => {
        window.editor = editor;
        editorReady();
      })
      .catch((error) => {
        console.error("Oops, something went wrong!");
        console.error(
          "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:",
        );
        console.warn("Build id: bojh7pnw6nnm-dfpekd22znn5");
        console.error(error);
      });
  }
  // This function is called when the editor is ready (Your GET logic should go here)
  function editorReady() {
    window.editor.setData("NA");

    // If $routeParams.urlName is defined then the client is requesting to edit an existing wiki
    if ($routeParams.urlName) {
      // Make Ajax request
      // load the data in the $scope ex. $scope.title = response.data.title...
      // load the HTML for CKEditor using window.editor.setData(response.data.html)
      $http
        .get(`/api/wiki/${$routeParams.urlName}`)
        .then(function (response) {
          // Load the data in the $scope
          $scope.title = response.data.title;
          // Load the HTML for CKEditor using window.editor.setData
          window.editor.setData(response.data.html);
        })
        .catch(function (error) {
          // Handle errors if needed
          console.error("Error fetching wiki data:", error);
        });
    }
  }

  // This function returns the HTML contents of the editor (Call this during your POST/PATCH operations)
  function getHtml() {
    return window.editor.getData();
  }

  // For your save logic, you will have two concerns
  // 1. Saving an existing wiki (use $routeParams.urlName to check) and do a PATCH
  //    request passing in the data items. call getHtml() to get the HTML of CKEditor
  // 2. Saving a new wiki, do a POST request

  $scope.saveWiki = function () {
    const wikiData = {
      // Include other data fields as needed
      title: $scope.title,
      category: $scope.category,
      author: $scope.author,
      urlName: $scope.urlName,
      html: getHtml(),
      // managementPassword: $scope.managementPassword,
      agreeToTerms: $scope.agreeToTerms,
      // password: req.body.password
    };

    if ($routeParams.urlName) {
      // Existing wiki, do a PATCH request
      $http
        .patch(`/api/wiki/${$routeParams.urlName}`, wikiData)
        .then(function (response) {
          // Handle successful update
          console.log("Wiki updated successfully:", response.data);
        })
        .catch(function (error) {
          // Handle errors if needed
          console.error("Error updating wiki:", error);
        });
    } else {
      // New wiki, do a POST request
      $http
        .post("/api/wiki", wikiData)
        .then(function (response) {
          // Handle successful creation
          console.log("New wiki created successfully:", response.data);
        })
        .catch(function (error) {
          // Handle errors if needed
          console.error("Error creating new wiki:", error);
        });
    }
  };



  $scope.cancelEdit = function () {
    console.log("Edit canceled");
  };


  $scope.deleteWiki = function () {
    if (confirm("Are you sure you want to delete this wiki?")) {
      $http
        .delete(`/api/wiki/delete/${$routeParams.urlName}`)
        .then(function (response) {
          console.log("Wiki deleted successfully:", response.data);
        })
        .catch(function (error) {

          console.error("Error deleting wiki:", error);
        });
    }
  };


  $http.get("/categories")
    .then(function (response) {

      $scope.categories = response.data;
    })
    .catch(function (error) {

      console.error("Error fetching categories:", error);
    });

});