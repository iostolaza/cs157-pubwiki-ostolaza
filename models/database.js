const mongoose = require("mongoose");

// STEP 1 - Connect to Mongoose DB
const conn = mongoose.connect(
  "mongodb+srv://cs157:cs157@cs157.xqzhffn.mongodb.net/searchDB?", { })
  .then(() => console.log("Connected to MongoDB."))
  .catch(err => console.log(err))

// Export the database connection

module.exports = conn;



// STEP 1 - Define Schema
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

// STEP 2 - Export model
module.exports = mongoose.model("search", searchSchema);


