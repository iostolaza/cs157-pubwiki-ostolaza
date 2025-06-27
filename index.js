
// index.js
require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require("./config/database.js");
const wikiRoutes = require('./routes/wiki'); 

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));

connectToDatabase();

app.use('/api/wiki', require('./routes/wiki'));
app.use('/api/user', require('./routes/user'));
app.use('/api/categories', (req, res) => {
  const categories = require('./config/categories');
  res.json(categories);
});


// Serve the AngularJS app
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => console.log("Server Started"));
