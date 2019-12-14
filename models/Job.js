var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new JobSchema object
var JobSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  logoLink: {
    type: String,
    required: true,
    // unique: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Job = mongoose.model("Job", JobSchema);

// Export the Job model
module.exports = Job;


