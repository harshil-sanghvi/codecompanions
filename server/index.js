const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const connectDb = require("./config/db");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorMiddleware");
const { CLIENT_URL } = require("./config/constants");
const path = require("path");

// Fail fast if required configuration is missing.
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnv.join(", ")}`.red
      .underline
  );
  process.exit(1);
}

// Connect to MongoDB.
connectDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: CLIENT_URL },
});

io.on("connection", (socket) => {
  // Handle user connection
  console.log("A user connected!");

  socket.on("joinRoom", (contestId) => {
    // Handle joining a room
    console.log(`User joined room: ${contestId}`);
    socket.join(contestId);
  });

  socket.on("updateContest", (contestId) => {
    // Broadcast a message that a user has updated the contest
    console.log(`Contest ${contestId} updated`);
    socket.broadcast.to(contestId).emit("contestUpdated", contestId);
  });

  socket.on("leaveContest", (contestId) => {
    // Handle leaving a room
    console.log(`User left room: ${contestId}`);
    socket.leave(contestId);
    socket.to(contestId).emit("contestUpdated", contestId);
  });
});

// Middleware setup
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contests", require("./routes/contestRoutes"));

// Error middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
