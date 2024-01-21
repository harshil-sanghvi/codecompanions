# CodeCompanions

This repository contains the client-side and server-side code for CodeCompanions, a platform for hosting coding contests and collaboration among users. CodeCompanions is a web application that enables users to create and participate in coding contests using the Codeforces API. It supports real-time updates, live contests, and dynamic ranklist management. The server-side code is built using Node.js and Express, with MongoDB as the database. Socket.IO is integrated to enable real-time updates during contests.

## Tech Stack

- **Frontend:** React, Redux, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Socket:** Socket.IO for real-time updates

# Frontend

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features

### Contest Management

- **Create a Contest:**
  - Users can create coding contests by providing essential details such as duration, problems, etc.
  - A unique Contest ID is generated for each contest.

- **Join a Contest:**
  - Participants can join contests using the generated Contest ID.

### Live Contests

- **Real-time Updates:**
  - The platform provides real-time updates during live contests.
  - Submissions, points, and ranklist are dynamically updated.

- **Dynamic Ranklist:**
  - Users can view and track their ranking in real-time during the contest.

### User Authentication

- **Secure Sign-Up:**
  - Users can create accounts with secure authentication.
  - Email verification is implemented to ensure account validity.

- **Log In:**
  - Registered users can log in securely.

### Problem Solving

- **Problem Set:**
  - Contestants can solve problems available in the problem set.
  - Each problem is associated with a rating.

- **Contest Start:**
  - Users can start a contest with specified problems and ratings.

- **Live Problem Solving:**
  - Real-time updates are provided when a user solves a problem.

### Profile Management

- **Edit Profile:**
  - Users have the option to edit their profile details.

## Project Structure

The project follows a modular structure:

- **`src/components`:** Reusable UI components.
- **`src/context`:** Context providers, e.g., SocketContext.
- **`src/data`:** Data services for fetching and parsing Codeforces data.
- **`src/features`:** Redux slices for different features (authentication, contests).
- **`src/pages`:** React components for different pages (Home, Dashboard, LiveContest).
- **`src/components/assets`:** SVG assets used in the project.

## Getting Started

To run the server locally:

1. Install dependencies:
   ```bash
   npm run setup
   ```
2. Run the Application:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to ``http://localhost:3000``.

## Usage

1. **Sign Up:**
   - Create a new account by providing your details.
   - Verify your email using the link sent to your registered email address.

2. **Log In:**
   - Log in using your credentials.

3. **Dashboard:**
   - Explore ongoing contests and join them.

4. **Live Contest:**
   - Participate in live contests, solve problems, and check the real-time ranklist.

5. **Profile:**
   - Edit your profile details.


# Backend

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Codeforces API Integration](#codeforces-api-integration)
- [Email Functionality](#email-functionality)
- [Socket.IO Integration](#socketio-integration)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)

## Project Structure

The project is organized into the following main directories:

- **controllers**: Contains controllers handling various functionalities.
- **middleware**: Houses middleware functions.
- **models**: Defines Mongoose schemas for MongoDB.
- **routes**: Defines API routes.
- **services**: Includes email services.
- **config**: Contains constants and configuration files.
- **index.js**: Main entry point for the server.

## Getting Started

To run the server locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables by creating a `.env` file based on the provided `.env.example`.
3. Start the server:
   ```bash
   npm install
   ```

## API Routes

### `/api/auth`

Handles user authentication, registration, login, and profile updates.

- **POST `/register`**: Register a new user with name, email, password, and Codeforces username.
- **POST `/login`**: Log in a user with email and password.
- **PUT `/profile`**: Update user profile with name and username.
- **POST `/send-reset-password-link`**: Send a reset password link to the user's email.
- **POST `/verify-reset-password-token/:token`**: Verify the reset password token.
- **PUT `/reset-password`**: Reset user password.
- **PUT `/verify/:token`**: Verify user email.

### `/api/contests`

Manages coding contests, including creation, joining, solving problems, and real-time updates.

- **GET `/all`**: Get all contests related to a user.
- **GET `/ongoing`**: Get the ongoing contest related to a user.
- **POST `/create`**: Create a new contest with specified details.
- **PUT `/join/:contestId`**: Join a contest.
- **PUT `/solve/:contestId`**: Solve a problem in a contest.
- **PUT `/start/:contestId`**: Start a contest.
- **PUT `/invalidate/:contestId`**: Invalidate a contest.
- **PUT `/leave/:contestId`**: Leave a contest.

### `/api/test`

Includes test routes for debugging.

## Codeforces API Integration

The Codeforces API is integrated using utility functions:

- **`makeCodeforcesRequest`**: Makes requests to the Codeforces API with retry logic.
- **`fetchUserSubmissions`**: Fetches user submissions from Codeforces.
- **`findWinnerForEachProblem`**: Determines the first person to solve each problem.

## Email Functionality

Nodemailer is used for sending verification and password reset emails. The `sendMail` service handles email sending, and token generation is done using JSON Web Tokens (JWT).

## Socket.IO Integration

Socket.IO is integrated for real-time updates during contests. Users can join rooms, and updates trigger broadcasts to the room.

## Error Handling

Error handling middleware is implemented to catch and respond to errors in a consistent format. Specific error handling is implemented in controllers.

## Dependencies

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Socket.IO**: Real-time web socket communication.
- **Nodemailer**: Module for sending emails.
- **Axios**: Promise-based HTTP client for making requests.

Feel free to explore the code for more details. Happy coding!

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
