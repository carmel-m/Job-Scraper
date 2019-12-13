// jquery for onClicks but don't use jquery to loop over and append

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#scrape-jobs").on("click", function(event) {
    // event.preventDefault();
    console.log("button clicked");

    $.ajax("/scrape", {
      type: "POST",
      // data: jobs
    }).then(function() {
      console.log("scraped jobs");
      location.reload();
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


});
