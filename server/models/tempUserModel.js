const mongoose = require("mongoose");

// Define the schema for temporary users
const tempUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Password can't be empty"],
    },
    username: {
      type: String,
      required: [true, "Please enter Codeforces username"],
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps to documents
  }
);

// Create a model based on the schema
const TempUser = mongoose.model("TempUser", tempUserSchema);

// Export the TempUser model and the user schema
module.exports = {
  TempUser,
  userSchema: tempUserSchema,
};
