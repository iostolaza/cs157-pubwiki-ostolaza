// config/database.js
// ESTABLISH THE CONNECTION

const mongoose = require('mongoose');

// It's generally better to keep the router logic separate from the database connection.
// const express = require('express');
// const wikiRoutes = express.Router();

// Define Schema
const searchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ["Science", "Technology", "Entertainment"],
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
    unique: true,
    match: /^[a-zA-Z0-9-_]+$/,
    index: true
  },
  html: {
    type: String,
    required: true,
  },
  password: {
    type: String
    // required: true,
  },
  pageViews: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
});

// Define Wiki Model
const Wiki = mongoose.model('Wiki', searchSchema);

// Establish the database connection
const connectToDatabase = async () => {
  try {
    await 
      mongoose.connect('mongodb+srv://cs157:wiki_123@cs157.g3wph.mongodb.net/?retryWrites=true&w=majority&appName=cs157', { 
        
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Export both the model and the connection function
module.exports = {
  Wiki,
  // router: wikiRoutes,
  connectToDatabase,
};
