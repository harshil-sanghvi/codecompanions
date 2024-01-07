const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // Connect to MongoDB using the provided URI from the environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log a successful connection message
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log an error message and exit the process if unable to connect
    console.error(`Unable to connect to MongoDB: ${error.message}`.red.underline);
    process.exit(1);
  }
};

// Export the connectDb function to be used in other files
module.exports = connectDb;

