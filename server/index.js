const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

// Connect to MongoDB.
connectDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  // Handle user connection
  console.log("A user connected!");

  socket.on("joinRoom", (contestId) => {
    // Handle joining a room
    console.log(`User joined room: ${contestId}`);
    socket.join(contestId);

    socket.on("updateContest", (contestId) => {
      // Broadcast a message that a user has updated the contest
      console.log(`Contest ${contestId} updated`);
      socket.broadcast.to(contestId).emit("contestUpdated", contestId);
    });
  });

  socket.on("leaveContest", (contestId) => {
    // Handle leaving a room
    console.log(`User left room: ${contestId}`);
    socket.leave(contestId);
    socket.to(contestId).emit("contestUpdated", contestId);
  });
});

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contests", require("./routes/contestRoutes"));
app.use("/api", require("./routes/testRoutes")); // Test route

// Error middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
