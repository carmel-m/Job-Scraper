var express = require("express");
var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

router.get("/", function(req, res) {
  db.Job.find({ saved: false }).then(function(data) {
    var hbsObject = {
      jobs: data
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
    // res.json(data);
  });
});

router.get("/saved", function(req, res) {
  db.Job.find({ saved: true }).then(function(data) {
    var hbsObject = {
      jobs: data
    };
    console.log("saved working");
    //   console.log(hbsObject);
    res.render("index", hbsObject);
    // res.json(data);
    console.log(hbsObject);
  });
});

module.exports = router;
