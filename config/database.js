
/// config/database.js

const mongoose = require('mongoose');
const categories = require('./categories'); 

const searchSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  category: { type: String, required: true,   enum: categories },
  author: { type: String, required: true, maxLength: 20 },
  urlName: { type: String, required: true, maxLength: 50, unique: true, match: /^[a-zA-Z0-9-_]+$/, index: true },
  html: { type: String, required: true },
  password: { type: String },
  pageViews: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Wiki = mongoose.model('Wiki', searchSchema);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = {
  Wiki,
  connectToDatabase,
};
