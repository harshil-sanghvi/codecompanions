const mongoose = require("mongoose");

// Schema definition for individual problems within a contest
const problemSchema = mongoose.Schema({
  name: String,
  problemLink: String,
  rating: Number,
  points: Number,
  problemId: String,
  isSolved: Boolean,
  solvedBy: String,
});

// Schema definition for individual contestants within a contest
const contestantSchema = {
  username: String,
  userId: String,
  points: Number,
  rank: Number,
};

// Main schema definition for a contest
const contestSchema = mongoose.Schema(
  {
    users: [
      {
        type: String,
        required: true,
        ref: "User", // Referencing the "User" model
      },
    ],
    admin: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    problems: {
      type: [problemSchema], // Array of problems using the problemSchema
      required: true,
    },
    contestants: {
      type: [contestantSchema], // Array of contestants using the contestantSchema
      default: [], // Default value for contestants is an empty array
      required: true,
    },
    isFinished: {
      type: Boolean,
      default: false, // Default value for isFinished is false
      required: true,
    },
    isStarted: {
      type: Boolean,
      default: false, // Default value for isStarted is false
      required: true,
    },
    startedAt: Date, // Timestamp for when the contest started
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Contest", contestSchema);
