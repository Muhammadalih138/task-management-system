import mongoose from 'mongoose';

// 1. Declare strict, explicit types on the global node scope
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

// 2. Initialize the global scope block instantly if empty
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// 3. This assignment guarantees 'cached' is always a valid object, never undefined
const cached = global.mongoose;

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('Please define the MONGODB_URI or MONGO_URI environment variable inside .env.local');
  }

  // TypeScript now knows safely that cached and cached.conn are fully mapped
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
      console.log('🚀 MongoDB connected successfully.');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
