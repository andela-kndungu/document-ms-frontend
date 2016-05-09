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
    addCategory: function(req, res) {
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
    },
    getCategory: function(req, res) {
      // Get the category based on provided id
      Categories.findById(req.params.id, function(error, category) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (category) {
            res.json({
              success: true,
              message: 'Category retrieved',
              entry: category
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
    updateCategory: function(req, res) {
      // Get the category based on provided id
      Categories.findById(req.params.id, function(error, category) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (category) {
            Object.keys(req.body).forEach(function(property) {
              category[property] = req.body[property];
            });
            // Save the updated category
            category.save(function(error) {
              // If error occured inform user
              if (error) {
                parseError(res, error);
              } else {
                // Return successfully updated category
                res.json({
                  success: true,
                  message: 'Category updated successfully',
                  entry: category
                });
              }
            });

          } else {
            // Inform user of error
            res.json({
              success: false,
              message: 'Category does not exist',
            });
          }
        }
      });
    },
    deleteCategory: function(req, res) {
      // Delete entry with provided id
      Categories.findByIdAndRemove(req.params.id, function(error, category) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (category) {
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
