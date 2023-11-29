const express = require("express");

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));


app.listen(3000, () => console.log("Server Started"));