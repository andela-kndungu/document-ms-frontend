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
    }
  };
})();
