(function() {
  'use strict';

  var Documents = require('../models/documents');
  var parseError = require('./parseError');

  module.exports = {
    getAll: function(req, res) {
      // Number of documents to be returned
      var limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

      // Start page
      var page = req.query.page ? parseInt(req.query.page, 10) : undefined;

      // Returns the values when executed
      var query = Documents.find();

      // If a specific page is requested
      if (page && limit) {
        // Move the cursor of the query result to skip
        var skip = page > 0 ? ((page - 1) * limit) : 0;
        query.skip(skip);
      }

      // If a limit is defined add it to the query
      if (limit) {
        query.limit(limit);
      }

      // Sort by date in descendig order (latest first)
      query.sort({
        created_at: -1
      });

      // Execute the query and return the results
      query.exec(function(error, documents) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(documents);
        }
      });
    },
    addDocument: function(req, res) {
      // Declare new instance of the Role "table"
      var document = new Documents();

      // Define values of the new "row" to add
      document.owner_id = req.body.owner_id;
      document.title = req.body.title;
      document.content = req.body.content;
      document.category = req.body.category;
      document.access_rights = req.body.access_rights;

      document.save(function(error) {
        if (error) {
          parseError(res, error);
        } else {
          // Return send success message
          res.json({
            success: true,
            message: 'Document created successfully',
            entry: document
          });
        }
      });
    },
    getDocument: function(req, res) {
      // Get entry in the documents "table" based on provided id
      Documents.findById(req.params.id, function(error, document) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (document) {
            res.json({
              success: true,
              message: 'Document retrieved',
              entry: document
            });
          } else {
            res.json({
              success: false,
              message: 'Document does not exist',
            });
          }
        }
      });
    },
    updateDocument: function(req, res) {
      // Update document with provided id
      Documents.findById(req.params.id, function(error, document) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (document) {
            Object.keys(req.body).forEach(function(property) {
              document[property] = req.body[property];
            });
            // Save the updated category
            document.save(function(error) {
              // If error occured inform user
              if (error) {
                parseError(res, error);
              } else {
                // Return successfully updated category
                res.json({
                  success: true,
                  message: 'Document updated successfully',
                  entry: document
                });
              }
            });

          } else {
            // Inform user of error
            res.json({
              success: false,
              message: 'Document does not exist',
            });
          }
        }
      });
    },
    deleteDocument: function(req, res) {
      // Delete entry with provided id
      Documents.findByIdAndRemove(req.params.id, function(error, document) {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        } else {
          if (document) {
            res.json({
              success: true,
              message: 'Document deleted successfully'
            });
          } else {
            res.json({
              success: false,
              message: 'Document does not exist'
            });
          }
        }
      });
    }
  };
})();
