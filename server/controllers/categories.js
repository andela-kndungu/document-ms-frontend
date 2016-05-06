(function() {
  'use strict';

  var Categories = require('../models/categories');
  var parseError = require('./parseError');

  module.exports = {
    getAll: function(req, res) {
      // Get all entries in the roles "table"
      Categories.find({}, function(error, categories) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(categories);
        }
      });
    },
    addRole: function(req, res) {
      // Declare new instance of the Role "table"
      var category = new Categories();

      // Define values of the new "row" to add
      category.title = req.body.title;

      category.save(function(error) {
        if (error) {
          parseError(res, error);
        } else {
          // Return send success message
          res.json({
            success: true,
            message: 'Category created successfully',
            entry: category
          });
        }
      });
    }
  };
})();
