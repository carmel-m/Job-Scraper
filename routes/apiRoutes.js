// NECESSARY?
var express = require("express");
var app = express.Router();

// Import the model to use its database functions.
var db = require("../models/job.js");


// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios
    .get("https://technical.ly/philly/jobs/?city=philadelphia")
    .then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // DO I WANT AN OBJECT OR AN ARRAY??
      var result = {};

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

        // how to access location?

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          link: link,
          logoLink: logoLink
        });

        console.log(results);

        // Create a new Job Listing using the `result` object built from scraping
        db.JobListing.create(result)
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

module.exports = app;