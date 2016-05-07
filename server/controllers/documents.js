(function() {
  'use strict';

  var Documents = require('../models/documents');
  var parseError = require('./parseError');

  module.exports = {
    getAll: function(req, res) {
      // Number of documents to be returned
      var limit = req.query.limit;

      // If no limit is defined return all documents
      if (!limit) {
        // Get all entries in the roles "table"
        Documents.find({}, function(error, documents) {
          //  Inform user if anything goes wrong
          if (error) {
            res.status(500);
            res.send('There was an error reading from the database');
          } else {
            // Else all's good, send results
            res.json(documents);
          }
        });
      } else {
        res.json({limit: limit});
      }

    },
    addDocument: function(req, res) {
      // Declare new instance of the Role "table"
      var document = new Documents();

      // Define values of the new "row" to add
      document.owner_id = req.body.owner_id;
      document.title = req.body.title;
      document.content = req.body.content;
      document.category = req.body.category;

      document.save(function(error) {
        if (error) {
          parseError(res, error);
        } else {
          // Return send success message
          res.json({
            success: true,
            message: 'Category created successfully',
            entry: document
          });
        }
      });
    }
  };
})();
