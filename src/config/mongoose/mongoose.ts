import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MONGODB: MONGODB_URI is not defined');

  if (isConnected) return console.log('MONGODB: Using existing database connection');

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log('MONGODB: Connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
