const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { VERIFY_EMAIL } = require("../config/constants");
const { sendMail } = require("../services/emailService");

// Route for testing
router.get(
  "/test",
  asyncHandler(async (req, res) => {
    res.status(200).json({ success: "Hello world!!" });
  })
);

// Route for sending verification email
router.post(
  "/email",
  asyncHandler(async (req, res) => {
    // Extract user information from the request body
    const { user } = req.body;

    // Send a verification email using the email service
    await sendMail(user, VERIFY_EMAIL)
      .then(() =>
        res.status(200).json({ message: `Email sent to ${user.email}` })
      )
      .catch((err) => {
        // Handle errors during the email sending process
        res.status(400).json({
          message: `Error sending email to ${user.email}`,
          error: err,
        });
      });
  })
);

module.exports = router;
