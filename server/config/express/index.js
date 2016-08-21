import express from 'express';
import bodyParser from 'body-parser';

import router from '../../router';

const expressConfig = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());
  app.use(express.static('public'));
  router(app);
};

export default expressConfig;

