const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  MIN_NUMBER_OF_PROBLEMS,
  MAX_NUMBER_OF_PROBLEMS,
  MIN_DURATION,
  MAX_DURATION,
  MIN_PROBLEM_POINTS,
  MAX_PROBLEM_POINTS,
  MAX_PROBLEM_RATING,
  MIN_PROBLEM_RATING,
} = require("../config/constants");

const {
  getContests,
  createContest,
  joinContest,
  solveProblem,
  invalidateContest,
  getOngoingContest,
  startContest,
  leaveContest,
} = require("../controllers/contestController");

const { protect } = require("../middleware/authMiddleware");

// Route to get all contests related to a user
router.route("/all").get(protect, getContests);

// Route to get the ongoing contest related to a user
router.route("/ongoing").get(protect, getOngoingContest);

// Route to create a new contest
router.route("/create").post(
  [
    // Validating contest creation data
    body(
      "problems",
      `Number of problems should be in between ${MIN_NUMBER_OF_PROBLEMS} and ${MAX_NUMBER_OF_PROBLEMS} `
    ).isArray({
      min: MIN_NUMBER_OF_PROBLEMS,
      max: MAX_NUMBER_OF_PROBLEMS,
    }),
    body(
      "duration",
      `Contest Duration should be in between ${MIN_DURATION} minutes and ${MAX_DURATION} minutes`
    ).isFloat({ min: MIN_DURATION, max: MAX_DURATION }),
    body(
      "problems.*.points",
      `Points of each problem should lie between ${MIN_PROBLEM_POINTS} and ${MAX_PROBLEM_POINTS}`
    ).isFloat({
      min: MIN_PROBLEM_POINTS,
      max: MAX_PROBLEM_POINTS,
    }),
    body("problems.*.name", "Name of problem should not be empty").notEmpty(),
    body("problems.*.problemLink", "Problem link is not specified").notEmpty(),
    body("problems.*.problemId", "Problem ID is not specified").notEmpty(),
    body(
      "problems.*.rating",
      `Problem rating should lie between ${MIN_PROBLEM_RATING} and ${MAX_PROBLEM_RATING}`
    ).isFloat({ min: MIN_PROBLEM_RATING, max: MAX_PROBLEM_RATING }),
  ],
  protect,
  createContest
);

// Route to join a contest
router.route("/join/:contestId").put(protect, joinContest);

// Route to solve a problem in a contest
router.route("/solve/:contestId").put(
  [
    // Validating solving a problem data
    body("problemName", "problemName can't be empty").not().isEmpty(),
    body("username", "username can't be empty").not().isEmpty(),
    body("timeStamp", "timeStamp can't be empty").not().isEmpty(),
  ],
  protect,
  solveProblem
);

// Route to start a contest
router.route("/start/:contestId").put(
  [
    // Validating starting a contest data
    body(
      "problems",
      `Number of problems should be in between ${MIN_NUMBER_OF_PROBLEMS} and ${MAX_NUMBER_OF_PROBLEMS} `
    ).isArray({
      min: MIN_NUMBER_OF_PROBLEMS,
      max: MAX_NUMBER_OF_PROBLEMS,
    }),
    body(
      "problems.*.points",
      `Points of each problem should lie between ${MIN_PROBLEM_POINTS} and ${MAX_PROBLEM_POINTS}`
    ).isFloat({
      min: MIN_PROBLEM_POINTS,
      max: MAX_PROBLEM_POINTS,
    }),
    body("problems.*.name", "Name of problem should not be empty").notEmpty(),
    body("problems.*.problemLink", "Problem link is not specified").notEmpty(),
    body("problems.*.problemId", "Problem ID is not specified").notEmpty(),
    body(
      "problems.*.rating",
      `Problem rating should lie between ${MIN_PROBLEM_RATING} and ${MAX_PROBLEM_RATING}`
    ).isFloat({ min: MIN_PROBLEM_RATING, max: MAX_PROBLEM_RATING }),
  ],
  protect,
  startContest
);

// Route to invalidate a contest
router.route("/invalidate/:contestId").put(protect, invalidateContest);

// Route to leave a contest
router.route("/leave/:contestId").put(protect, leaveContest);

module.exports = router;
