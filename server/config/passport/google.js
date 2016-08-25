import { OAuth2Strategy as googleStrategy } from 'passport-google-oauth';
import Users from '../../models/users.js';

// Social auth is practically impossible to test
/* istanbul ignore next */
const handleResponse = (token, refreshToken, profile, done) => {
  process.nextTick(() => {
    Users.findOne({ email: profile.emails[0].value }, (err, user) => {
      if (err) {
        return done(err);
      }
      // If the email is already in use
      if (user) {
        // If user is already registered with google
        if (user.google.id) {
          // Do nothing
          return done(null, user);
        }
        // Else add google credentials, save and return
        user.google.id = profile.id;
        user.google.token = token;
        user.save((error) => {
          if (error) {
            throw err;
          }

          return done(null, user);
        });
      } else {
        // If email is not in use, create new, save and return
        const newUser = new Users();

        // set all of the relevant information
        const firstName = profile.displayName.split(' ')[0];
        const lastName = profile.displayName.split(' ')[1];

        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.name.first = firstName;
        newUser.name.last = lastName;
        newUser.email = profile.emails[0].value; // pull the first email
        newUser.photo = `${profile.photos[0].value}0`;
        newUser.roles = ['user', firstName.toLowerCase()];

        // If the username is already in use, append a random number to it
        Users.findOne({ username: firstName.toLowerCase() }, (e, u) => {
          if (u) {
            const randomUserNameNumber = Math.floor(Math.random() * 1000);
            newUser.username = `${firstName.toLowerCase()}_ ${randomUserNameNumber}`;
          } else {
            newUser.username = firstName.toLowerCase();
            // save the user
            newUser.save((er) => {
              if (er) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
      }
      return null;
    });
  });
};

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const google = new googleStrategy(googleCredentials, handleResponse);

export default google;

