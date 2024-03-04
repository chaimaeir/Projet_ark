const mongoose=require('mongoose');

 
const db = process.env.DATABASE_URL||"mongodb://localhost:27017/Management_System";
const connectDB = async () => {
    try {
      await mongoose.connect(db);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure
    }
  };

  module.exports = connectDB; 
