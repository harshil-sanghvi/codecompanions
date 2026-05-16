const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDb = async () => {
  try {
    // Connect to MongoDB using the provided URI from the environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a successful connection message
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log an error message and exit the process if unable to connect
    logger.error(`Unable to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Export the connectDb function to be used in other files
module.exports = connectDb;

