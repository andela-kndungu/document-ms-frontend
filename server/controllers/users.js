(function() {
  'use strict';

  var jwt = require('jsonwebtoken');
  var Users = require('../models/users');
  var Documents = require('../models/documents');
  var parseError = require('./parseError');

  module.exports = {
    addUser: function(req, res) {
      // Declare new instance of the Users "table"
      var user = new Users();

      // Define values of the new "row" to add
      user.username = req.body.username;
      user.name.first = req.body.firstName;
      user.name.last = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.role = req.body.role;

      user.save(function(error) {
        if (error) {
          parseError(res, error);
        } else {
          // Return send success message
          res.json({
            success: true,
            message: 'User created successfully',
            entry: user
          });
        }
      });
    },
    getAll: function(req, res) {
      // Get all entries in the users "table"
      Users.find({}, function(error, users) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(users);
        }
      });
    },
    login: function(req, res) {
      // Look for user in the database
      Users.findOne({
        username: req.body.username
      }, function(error, user) {
        // In case of a server error inform the user
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        }

        // User not in the database
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else {
          // Verify provided password is valid
          user.validatePassword(req.body.password, function(error, isMatch) {
            if (error) {
              throw error;
            }
            if (isMatch) {
              // All's good, create a token
              var token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: '90 days'
              });

              // Return token and success message in JSON
              res.json({
                success: true,
                message: 'You\'ve successfully been logged in.',
                token: token,
                entry: user
              });
            }
            // Passwords do not match
            else {
              res.json({
                success: false,
                message: 'Authentication failed. Wrong password.'
              });
            }
          });
        }
      });
    },
    getDocumentsById: function(req, res) {
      // Get all entries in the users "table" based on provided id
      Documents.find({'owner_id':req.params.id}, function(error, users) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(users);
        }
      });
    }
  };
})();
