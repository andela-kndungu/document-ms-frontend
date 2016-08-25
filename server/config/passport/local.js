import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../../models/users.js';

const local = new LocalStrategy({ session: false },
  (username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }

      // Check whether user exists
      if (!user) {
        return done(null, false, { message: 'User does not exist' });
      }

      // If user exists confirm correct password was given
      user.validatePassword(password, (error, match) => {
        if (!match) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });

      // Because eslint complained
      return (null);
    });
  }
);

export default local;

