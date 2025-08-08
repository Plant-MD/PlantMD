import mongoose from "mongoose";

type ConnectionState = {
  isConnected?: number;
};

const connection: ConnectionState = {};

// Enhanced dbConnect function
export const dbConnect = async (): Promise<void> => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected.");
    return;
  }

  // Check if currently connecting
  if (mongoose.connection.readyState === 2) {
    console.log("Database is connecting, waiting...");
    // Wait for connection to complete
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Connection timeout")),
        10000
      );
      mongoose.connection.once("connected", () => {
        clearTimeout(timeout);
        resolve(true);
      });
      mongoose.connection.once("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
    return;
  }

  // Use environment variable or default value for MongoDB URI
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error(
      "MongoDB connection URI is not defined in environment variables."
    );
  }

  // Validate connection string format
  if (
    !mongoUri.startsWith("mongodb://") &&
    !mongoUri.startsWith("mongodb+srv://")
  ) {
    throw new Error(
      "Invalid MongoDB connection URI format. Must start with mongodb:// or mongodb+srv://"
    );
  }

  // Log connection attempt (without exposing credentials)
  const sanitizedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
  console.log("Attempting to connect to:", sanitizedUri);

  try {
    console.log("Connecting to database...");

    // Add connection options for better reliability
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout for server selection
      socketTimeoutMS: 45000, // 45 second socket timeout
      connectTimeoutMS: 10000, // 10 second connection timeout
      maxPoolSize: 10, // Maximum number of connections
      retryWrites: true,
      w: "majority",
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(
      `Database connected successfully (State: ${connection.isConnected}).`
    );
  } catch (error: any) {
    console.error("Database connection failed. Error details:", error);

    // Provide more specific error messages
    if (error.code === "ETIMEOUT") {
      throw new Error(
        "Database connection timeout - please check your network connection and MongoDB Atlas configuration"
      );
    } else if (error.code === "ENOTFOUND") {
      throw new Error(
        "Database hostname not found - please verify your MongoDB connection string"
      );
    } else if (error.message?.includes("authentication")) {
      throw new Error(
        "Database authentication failed - please check your credentials"
      );
    } else if (error.message?.includes("not authorized")) {
      throw new Error(
        "Database authorization failed - please check your IP whitelist and user permissions"
      );
    } else {
      throw new Error(
        `Database connection failed: ${error.message || "Unknown error"}`
      );
    }
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
