import mongoose, { ConnectOptions } from 'mongoose';

const uri_db = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(uri_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
