var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");

var htmlRoutes = require("./routes/htmlRoutes.js")
var apiRoutes = require("./routes/apiRoutes.js")

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.use(htmlRoutes);
app.use(apiRoutes);

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/jobsdb";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
