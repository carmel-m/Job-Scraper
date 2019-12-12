// append articles in handlebars doc
// jquery for onClicks but don't use jquery to loop over and append

// Need 2x front end routes - a "/" route and "/saved" route
var express = require("express");
var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

router.get("/", function(req, res) {

    db.Job.find({})
    .then(function(data) {

    //   var hbsObject = {
    //     jobs: data
    //   };
      console.log(data);
    //   console.log(hbsObject);
    //   res.render("index", hbsObject);
    res.json(data);
    });
  });

  module.exports = router;