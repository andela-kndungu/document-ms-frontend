import mongoose from 'mongoose';

// Set up environment variables when not running on CIo
if (!process.env.DATABASE_URI) {
  require('dotenv').config();
}

const databaseUri = process.env.DATABASE_URI;
const dbConnect = () => {
  // Connect to the database and get the connection
  mongoose.connect(databaseUri);
  const dbConnection = mongoose.connection;

  // Provide feedback on the DB connection
  // Can't think of a way to test server error
  /* istanbul ignore next */
  dbConnection.on('error', (error) => {
    console.error(error);
  });

  dbConnection.once('open', () => {
    console.info('Successfully connected to db');
  });
};

export default dbConnect;

