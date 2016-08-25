import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import router from '../../router';

const expressConfig = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(express.static('public'));
  router(app);
};

export default expressConfig;

