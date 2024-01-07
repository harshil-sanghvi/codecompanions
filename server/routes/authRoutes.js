const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  verifyUser,
  sendResetPasswordLink,
  resetPassword,
  verifyPasswordResetToken,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Route for user registration
router.post(
  "/register",
  [
    body("name", "Name can not be empty.").isLength({ min: 1 }),
    body("email", "Email can not be empty.").isLength({ min: 1 }).isEmail(),
    body("password", "Password can not be less than 4 characters.").isLength({
      min: 4,
    }),
    body("username", "Username can not be empty").isLength({ min: 1 }),
  ],
  registerUser
);

// Route for user login
router.post(
  "/login",
  [
    body("email", "Email can not be empty.").isLength({ min: 1 }).isEmail(),
    body("password", "Password can not be empty.").isLength({ min: 1 }),
  ],
  loginUser
);

// Route for updating user profile
router.put(
  "/profile",
  [
    body("name", "Name can not be empty.").isLength({ min: 1 }),
    body("username", "Username can not be empty").isLength({ min: 1 }),
  ],
  protect, // Middleware to protect the route with authentication
  updateProfile
);

// Route for sending a reset password link
router.post(
  "/send-reset-password-link",
  [body("email", "Email can not be empty.").isLength({ min: 1 }).isEmail()],
  sendResetPasswordLink
);

// Route for verifying reset password token
router.post("/verify-reset-password-token/:token", verifyPasswordResetToken);

// Route for resetting user password
router.put(
  "/reset-password",
  [
    body("password", "Password can not be less than 4 characters.").isLength({
      min: 4,
    }),
  ],
  protect, // Middleware to protect the route with authentication
  resetPassword
);

// Route for verifying user email
router.put("/verify/:token", verifyUser);

module.exports = router;
