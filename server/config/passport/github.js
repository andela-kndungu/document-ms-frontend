import { Strategy as githubStrategy } from 'passport-github';
import request from 'superagent';
import Users from '../../models/users.js';

// Social auth is practically impossible to test
/* istanbul ignore next */
const handleResponse = (token, refreshToken, profile, done) => {
  process.nextTick(() => {
    request
      .get(`https://api.github.com/user/emails?access_token=${token}`)
      .end((err, res) => {
        const email = res.body[0].email;
        Users.findOne({ email }, (error, user) => {
          if (error) {
            return done(err);
          }

          // If the email is already in use
          if (user) {
            // And the user has signned up with github already
            if (user.github.id) {
              // Just return the user
              return done(null, user);
            }

            // Else add github credentials, save and return user
            user.github.id = profile.id;
            user.github.token = token;
            user.save((saveError) => {
              if (saveError) {
                throw err;
              }

              return done(null, user);
            });
          } else {
            // Email not in use, create a new entry, save and return
            const newUser = new Users();

            // set all of the relevant information
            const firstName = profile.displayName.split(' ')[0];
            const lastName = profile.displayName.split(' ')[1];

            newUser.github.id = profile.id;
            newUser.github.token = token;
            newUser.name.first = firstName;
            newUser.name.last = lastName;
            newUser.email = email;
            newUser.photo = profile.photos[0].value;
            newUser.roles = ['user', profile.username.toLowerCase()];

            // If the username is already in use, append a random number to it
            Users.findOne({ username: profile.username.toLowerCase() }, (e, u) => {
              if (u) {
                const randomUserNameNumber = Math.floor(Math.random() * 1000);
                newUser.username = `${profile.username.toLowerCase()}_${randomUserNameNumber}`;
              } else {
                newUser.username = profile.username.toLowerCase();
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

          // Because eslint complained
          return null;
        });
      });
  });
};

const githubCredentials = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const github = new githubStrategy(githubCredentials, handleResponse);

export default github;

