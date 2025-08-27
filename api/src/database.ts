import mongoose from 'mongoose';

const connectDB = async () => {
  const CONN_URI = process.env.DB_URI;

  if (!CONN_URI) {
    throw new Error(
      'DB_URI environment variable is not set. Please provide a valid MongoDB connection string.',
    );
  }

  try {
    const conn = await mongoose.connect(CONN_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default connectDB;
