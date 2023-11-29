// Endpoint handlers

// at least 5 endpoints

// 1) Search Endpoint
// The endpoint used in the Home view to search for an existing page
/*
GET (/api/wiki/search/:searchTerm)
- Create the filter object
    let filterObj = {
      $or: [
        { title: { $regex: req.params.searchTerm, $options: 'i' } },
        { html: { $regex: req.params.searchTerm, $options: 'i' } }
      ]
    }
- Use your wiki model to filter the results
- Wiki.find(filterObj).exec(function(err, result) {})
*/



// 2 (Return a single wiki page based on the urlName)
// GET /api/wiki/:urlName (Used for the wiki edit and wiki display views)
// - query collection using the function findOne({ urlName: req.params.urlName})
// - If that page exists, increment the page count, save it result.save(), return the wiki page




// 3 (Create a new wiki page)
// POST /api/wiki/ (Used for the new wiki view)
// - Create the new wiki object based on the data from the client. new Wiki(req.body)
// - You save the wiki and return the result



// 4 (Updating an existing wiki page)
// PATCH /api/wiki/:urlName/ (Used for the wiki update view)
// - Get the wiki page based on the urlName (findOne())
// - If the wiki is found then we compare the password that is stored with the one client passed it
//   if (result.password == req.body.password)
//      set the data item one by one and call the save() -> return result



// 5 (Delete a wiki page)
// POST /api/wiki/delete/:urlName
// - Get the wiki page using findOne()
// - if the page exisits, compare the stored management password with the one client sent in
//   if (result.password == req.body.password)
//    findByIdAndDelete(result._id)

// From client
// $http.post("/api/wiki/abc", { managementPassword: $scope.password })
// POST /api/wiki/delete/:urlName

