(function() {
  'use strict';

  var Tags = require('../models/tags');
  var parseError = require('./parseError');

  module.exports = {
    // Add a new tag
    create: function(req, res) {
      // Declare new instance of the Tags model
      var tag = new Tags();

      // Define values of the new object to add
      tag.title = req.body.title;

      // Save the new tag parsing the error if request is invalid
      tag.save(function(error) {
        if (error) {
          return parseError(res, error);
        }

        // Tag created, return success message
        return res.json({
          success: true,
          message: 'Tag created successfully',
          entry: tag
        });
      });
    },

    // Handle all get requests for tags
    find: {
      // Retrieve by ID
      id: function(req, res) {
        Tags.findById(req.params.id, function(error, tag) {
          // Inform user of errors with the database
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'There was an error reading from the database'
            });
          }

          // Success, return retrieved tag with success message
          if (tag) {
            return res.json({
              success: true,
              message: 'Tag retrieved',
              entry: tag
            });
          }

          // Failed, no tag with specified ID
          return res.status(404).json({
            success: false,
            message: 'Tag does not exist',
          });
        });
      },

      // Retrieve all tags
      all: function(req, res) {
        // Get all entries in the tags model
        Tags.find({}, function(error, tags) {
          // Inform user of errors with the database
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'There was an error reading from the database'
            });
          }
          
          // Success, return retrieved tags with success message
          return res.json({
            success: true,
            message: 'Tags retrieved',
            entry: tags
          });
        });
      }
    },

    // Update tag by ID
    update: function(req, res) {
      // Get the tag to update
      Tags.findById(req.params.id, function(error, tag) {
        // Inform user of errors with the database
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        }

        // Tag found, update it
        if (tag) {
          // For each property sent in the body
          Object.keys(req.body).forEach(function(property) {
            // Update the tag
            tag[property] = req.body[property];

          });

          // Save the updated tag
          tag.save(function(error) {
            // Parse any error and pass on to user
            if (error) {
              return parseError(res, error);
            }

            // Tag updated, return success message
            return res.json({
              success: true,
              message: 'Tag created successfully',
              entry: tag
            });
          });
        }

        // Failed, no document with specified ID
        return res.status(404).json({
          success: false,
          message: 'Tag does not exist',
        });
      });
    },

    // Delete specified tag
    destroy: function(req, res) {
      // Find tag to delete
      Tags.findByIdAndRemove(req.params.id, function(error, tag) {
        // Inform user of errors with the database
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        }

        // Tag deleted, return success message
        if (tag) {
          return res.json({
            success: true,
            message: 'Tag deleted successfully'
          });
        }

        // Failed, no document with specified ID
        return res.json({
          success: false,
          message: 'Tag does not exist',
        });
      });
    }
  };
})();
