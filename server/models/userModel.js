const mongoose = require("mongoose");

// Define the user schema for MongoDB
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"], // Name is required
    },
    email: {
      type: String,
      required: [true, "Please add an email"], // Email is required
      unique: true, // Email should be unique
    },
    password: {
      type: String,
      required: [true, "Password can't be empty"], // Password is required
    },
    username: {
      type: String,
      required: [true, "Please enter codeforces username"], // Codeforces username is required
    },
    verified: {
      type: Boolean,
      default: false, // Default value for verification status is false
      required: true, // Verification status is required
    },
    imageUrl: {
      type: String,
      default: "", // Default value for image URL is an empty string
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

// Create a User model based on the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model and the userSchema
module.exports = {
  User,
  userSchema,
};
