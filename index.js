// index.js

const express = require("express");
const { connectToDatabase } = require("./config/database.js");
const wikiRoutes = require('./routes/wiki'); 

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));

connectToDatabase();

app.use("/api/wiki", wikiRoutes);

app.listen(3000, () => console.log("Server Started"));
