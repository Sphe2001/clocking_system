import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Use a cached connection to prevent multiple connections in development
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connect() {
  try {
    if (cached.conn) {
      console.log("Using existing MongoDB connection.");
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(DATABASE_URL, {
        bufferCommands: false, // Prevents duplicate commands in case of reconnects
      });
    }

    cached.conn = await cached.promise;
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error: " + err);
      process.exit(1);
    });

    // Prevent MaxListenersExceededWarning
    process.setMaxListeners(50);

    (global as any).mongoose = cached; // Store cached connection globally

    return cached.conn;
  } catch (error) {
    console.error("Something went wrong with MongoDB connection!");
    console.error(error);
  }
}
