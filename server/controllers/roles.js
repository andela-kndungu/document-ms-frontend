(function() {
  'use strict';

  var Roles = require('../models/roles');
  var parseError = require('./parseError');

  module.exports = {
    getAll: function(req, res) {
      // Get all entries in the roles "table"
      Roles.find({}, function(error, roles) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(roles);
        }
      });
    },
    addRole: function(req, res) {
      // Declare new instance of the Role "table"
      var role = new Roles();

      // Define values of the new "row" to add
      role.title = req.body.title;

      role.save(function(error) {
        if (error) {
          parseError(res, error);
        } else {
          // Return send success message
          res.json({
            success: true,
            message: 'Role created successfully'
          });
        }
      });
    },
    getRole: function(req, res) {
      // Get the category based on provided id
      Roles.findById(req.params.id, function(error, role) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (role) {
            res.json({
              success: true,
              message: 'Category retrieved',
              entry: role
            });
          } else {
            res.json({
              success: false,
              message: 'Category does not exist',
            });
          }
        }
      });
    },
    updateRole: function(req, res) {
      // Get the category based on provided id
      Roles.findById(req.params.id, function(error, role) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (role) {
            Object.keys(req.body).forEach(function(property) {
              role[property] = req.body[property];
            });
            // Save the updated category
            role.save(function(error) {
              // If error occured inform user
              if (error) {
                parseError(res, error);
              } else {
                // Return successfully updated role
                res.json({
                  success: true,
                  message: 'Role updated successfully',
                  entry: role
                });
              }
            });

          } else {
            // Inform user of error
            res.json({
              success: false,
              message: 'Role does not exist',
            });
          }
        }
      });
    },
    deleteRole: function(req, res) {
      // Delete entry with provided id
      Roles.findByIdAndRemove(req.params.id, function(error, role) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (role) {
            res.json({
              success: true,
              message: 'Category deleted successfully'
            });
          } else {
            res.json({
              success: false,
              message: 'Category does not exist'
            });
          }
        }
      });
    }
  };
})();
