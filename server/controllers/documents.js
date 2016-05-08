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
        created: -1
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
    updateDocument: function(req, res) {
      // Return all entry in Documents "table" with provided id
      Documents.find({
        '_id': req.params.id
      }, function(find_error, documents) {
        // In case of error inform user
        if (find_error) {
          console.log(find_error);
          res.status(500);
          res.send('Error reading from database');
        } else{
          if (documents) {
            // Update each entry found
            documents.forEach(function(document) {
              // For every object property in the body
              // Update it's corresponding db property
              Object.keys(req.body).forEach(function(property) {
                document[property] = req.body[property];

                // "Row" can now have an updated value
                document.updated = new Date();
              });

              // Save the updated "row"
              document.save(function(save_error) {
                // If error occured inform user
                if (save_error) {
                  res.status(500);
                  res.send('Error saving to database');
                }
              });
            });
            // Return successfully updated object
            res.json({
              success: true,
              message: 'Document updated successfully',
              entry: documents[0]
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
    }
  };
})();
