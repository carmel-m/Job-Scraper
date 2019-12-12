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

      // DO I WANT AN OBJECT OR AN ARRAY??
      var result = [];

      $(".job-single").each(function(i, element) {
        var title = $(element)
          .parent()
          .attr("title");
        var link = $(element)
          .parent()
          .attr("href");
        var logoLink = $(element)
          .find("img")
          .attr("src");
        // var location = $(element)
        // .find(".job-info").children()
            // how to access location?

        // Save these results in an object to push into results array
        results.push({
          title: title,
          link: link,
          logoLink: logoLink
        });

        console.log(results);

        // Create a new Job Listing using the `results` object built from scraping
        db.Job.create(result)
          .then(function(dbListing) {
            // View the added result in the console
            console.log(dbListing);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
});

module.exports = router;