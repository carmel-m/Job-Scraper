// jquery for onClicks but don't use jquery to loop over and append

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#scrape-jobs").on("click", function() {
    console.log("SCRAPE button clicked");

    $.ajax("/scrape", {
      type: "GET"
    }).then(function() {
      console.log("scraped jobs");
      location.reload();
    });
  });

  // GO TO SAVED JOBS - CLICK WORKING BUT NOT REDIRECTING
  $("#saved-jobs").on("click", function(event) {
    event.preventDefault();
    console.log("SAVED button clicked");

    $.ajax("/saved", {
      type: "GET"
    }).then(function() {

      console.log("trying to go to saved page");
      location.reload();
    });
  });

  // GO TO HOME PAGE - CLICK WORKING BUT NOT REDIRECTING
  $("#job-listings").on("click", function(event) {
    event.preventDefault();
    console.log("HOME button clicked");

    $.ajax("/", {
      type: "GET"
    }).then(function() {
      
      console.log("trying to go home");
      location.reload();
    });
  });

  // SAVE/UNSAVE A JOB
  $(".save-unsave").on("click", function(event) {
    event.preventDefault();
    console.log("SAVE/DELETE button clicked");

    var dbID = $(this).attr("db-id");
    console.log(dbID);

    var savedStatus = $(this).attr("saved");

    if (savedStatus === "false") {
      $.ajax("/saved/" + dbID, {
        type: "PUT"
      }).then(function() {
        location.reload();
      });
    } else {
      $.ajax("/unsave/" + dbID, {
        type: "PUT"
      }).then(function() {
        location.reload();
      });
    }
  });
});

// Send the POST request.
//  $.ajax("/api/cats", {
//   type: "POST",
//   data: newCat
// }).then(
//   function() {
//     console.log("created new cat");
//     // Reload the page to get the updated list
//     location.reload();
//   }
// );

// Send the PUT request.
//   $.ajax("/api/cats/" + id, {
//     type: "PUT",
//     data: newSleepState
//   }).then(
//     function() {
//       console.log("changed sleep to", newSleep);
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });

// $(".create-form").on("submit", function(event) {
//   // Make sure to preventDefault on a submit event.
//   event.preventDefault();

//   var newCat = {
//     name: $("#ca").val().trim(),
//     sleepy: $("[name=sleepy]:checked").val().trim()
//   };

//   // Send the POST request.
//   $.ajax("/api/cats", {
//     type: "POST",
//     data: newCat
//   }).then(
//     function() {
//       console.log("created new cat");
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });
