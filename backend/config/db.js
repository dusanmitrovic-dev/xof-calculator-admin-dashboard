const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('debug', true); // Add this line
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // dbName: 'database',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
