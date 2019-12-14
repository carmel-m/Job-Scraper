var express = require("express");
var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

router.get("/", function(req, res) {
  db.Job.find({ saved: false }).then(function(data) {
    var hbsObject = {
      jobs: data
    };
       
    res.render("index", hbsObject);
    // console.log(hbsObject);
  });
});

router.get("/saved", function(req, res) {
  db.Job.find({ saved: true }).then(function(data) {
    var hbsObject = {
      jobs: data
    };
    // console.log("saved working");
  
    res.render("index", hbsObject);
    // console.log(hbsObject);
  });
});

module.exports = router;
