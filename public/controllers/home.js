

wikiApp.controller("homeController", function($scope, $http) {
  $scope.homeController = () => {
    //STEP 3 - Create Object

    let searchObj = {
      title: $scope.title, //required, max length
      category: $scope.category, 	 //required, enum
      author:	$scope.author,  //required, max length
      urlName: $scope.urlName,  //required, unique index, max length, regex /^[a-zA-Z0-9-_]+$/
      html:	$scope.html,  //required
      password:	$scope.password,  //required
      pageViews: $scope.pageViews,  //number, default: 0
      createdDate: $scope.createDate, // date, default: Date.now()
      updatedDate: $scope.updateDate, // date, default: date.now()

    }

    //STEP 4 - Call Service
    
    // Make Ajax call to our register endpoint
    $http.post("/home", regInfo)
      .then(function(result) {
        // Registration was a success
        // redirect user to the login view
        window.location = "#!/home";
      })
      .catch(function(result) {
        $scope.status = result.data;
      })
  }

  




  
  var homehttp = $http
});




















//mongodb+srv://cs157:cs157@cs157.61codi0.mongodb.net/searchDB?retryWrites=true&w=majority

// STEP 2 - Define Schema
const searchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },

  category: {
    type: String,
    required: true,
    enum: [
      "Science",
      "Technology",
      "Entertainment",]
  },

  author: {
    type: String,
    required: true,
    maxLength: 20,
  },
  urlName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  html: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true

  },
  pageViews: {
    type: Int32Array,
    default: 0
  },
   createdDate: {
    type: Date,
    default: Date.now()
  },

  updatedDate: {
    type: Date,
    default: Date.now()
  }


})

// STEP 3 - Create Object

let searchInfo = {
  title: "title", //required, max length
  category: "category", 	 //required, enum
  author:	"author",  //required, max length
  urlName:	"urlname",  //required, unique index, max length, regex /^[a-zA-Z0-9-_]+$/
  html:	"html",  //required
  password:	"pwsrd",  //required
  pageViews:	"views",  //number, default: 0
  createdDate:	"createdate", // date, default: Date.now()
  updatedDate:	"updatedate", // date, default: date.now()

}


// STEP 4 - Create Model
const Search = mongoose.model("Search", searchSchema);


// const { mongo, default: mongoose } = require("mongoose");


  // Controller for home view

  // event handler for the search button
  // $http.get() to your search endpoint
  // the result will be an array of objects, assign this to a scope var
  // $scope.searchResults = ..
  
  // STEP 4 - GET (Read All tasks)
  app.get("", (req, res) => {
    Todo.find().exec()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  })

  // STEP 5 - POST (Create new task)
  app.post("", (req, res) => {
    let newTask = new Todo(req.body);
    newTask.save()
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })

  // STEP 6 - PATCH (Update a task)
  app.patch("/api/todos/:id", (req, res) => {
    Todo.findByIdAndUpdate(
      req.params.id, // The id of the document we want to update
      req.body, // The object that contains the changes
      {
        new: true, // return the updated object
        runValidators: true // make sure the updates are validated against the schema
      })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })

  // STEP 6 - DELETE (Delete a task)
  app.delete("", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })



// STEP 7 - Server Started
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 3000");
  }
})
