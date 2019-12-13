var express = require("express");
var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// GET ROUTE FOR SCRAPING TECHNICAL.LY WEBSITE

router.get("/scrape", function(req, res) {
  // grab body of html w/ axios
  axios
    .get("https://technical.ly/philly/jobs/?city=philadelphia")
    .then(function(response) {
      // load into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      $(".job-single").each(function(i, element) {
        var results = {};

        results.title = $(element)
          .parent()
          .attr("title");

        results.link = $(element)
          .parent()
          .attr("href");

        results.logoLink = $(element)
          .find("img")
          .attr("src");

        console.log(results);

        // var location = $(element)
        // .find(".job-info").children()

        // Create a new Job Listing using the `results` object built from scraping
        db.Job.create(results)
          .then(function(dbListing) {
            // View the added result in the console
            console.log(dbListing);
          })
          .catch(function(err) {
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
});

router.put("/saved/:id", function(req, res) {
  console.log(req.params.id);
  db.Job.findOneAndUpdate({ _id: req.params.id }, { saved: true }).then(function(data) {
    res.json(data);
  })
});

router.put("/unsave/:id", function(req, res) {
  db.Job.findOneAndUpdate({ _id: req.params.id }, { saved: false }).then(function(data) {
    res.json(data);
  })
});

module.exports = router;
