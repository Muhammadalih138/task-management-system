import mongoose from 'mongoose';

// 1. Declare explicit TypeScript global types to prevent variable bypass bugs
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

// 2. Initialize the caching layer cleanly on the global scope
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('Please define the MONGODB_URI or MONGO_URI environment variable inside .env.local');
  }

  // If a connection is already alive, reuse it instantly
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection attempt is in progress, start a new one cleanly
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
      console.log('🚀 MongoDB connected successfully to the exact data path.');
      return mongooseInstance;
    });
  }

  try {
    // Wait for the connection promise to resolve safely
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset the cache pool on failure so the next API request can retry fresh
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
