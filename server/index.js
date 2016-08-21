import express from 'express';

import config from './config';

const app = express();

// Connect to the database
config.db();

// Add middleware to express
config.express(app);

// Start taking requests
const webServer = app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.info('Server listening at port', process.env.PORT);
  }
});

// To be able to use with supertest
module.exports = webServer;

