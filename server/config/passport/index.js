import passport from 'passport';
import local from './local.js';
import google from './google.js';
import github from './github.js';

export default function () {
  passport.use(local);
  passport.use(google);
  passport.use(github);
}

