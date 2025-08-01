import mongoose from "mongoose";

type ConnectionState = {
  isConnected?: number;
};

const connection: ConnectionState = {};

// Enhanced dbConnect function
export const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is already connected.");
    return;
  }

  try {
    // Use environment variable or default value for MongoDB URI
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("MongoDB connection URI is not defined in environment variables. Using fallback mode.");
      // Don't exit the process, just return without connecting
      return;
    }

    const db = await mongoose.connect(mongoUri); // No need for additional options in Mongoose v6+
    connection.isConnected = db.connections[0].readyState;

    console.log(`Database connected successfully (State: ${connection.isConnected}).`);
  } catch (error) {
    console.error("Database connection failed. Error details:", error);
    console.warn("Continuing without database connection. Some features may not work.");
    // Don't exit the process, just log the error and continue
  }
};

// Gracefully close the database connection
export const dbDisconnect = async (): Promise<void> => {
  if (connection.isConnected) {
    try {
      await mongoose.disconnect();
      connection.isConnected = undefined;
      console.log("Database connection closed.");
    } catch (error) {
      console.error("Failed to disconnect the database. Error details:", error);
    }
  } else {
    console.log("No database connection to close.");
  }
};

export default dbConnect;