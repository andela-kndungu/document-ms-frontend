(function() {
  'use strict';

  var Documents = require('../models/documents');
  var parseError = require('./parseError');

  module.exports = {
    getAll: function(req, res) {
      // Using query builder
      var query = Documents.find({});

      // Return documents created on a specific day
      if (req.query.date) {
        var millisecondsInDay = 86400000;
        var requestedDay = new Date(req.query.date);
        var nextDay = new Date (requestedDay.getTime() + millisecondsInDay);
        query.where('created')
          .gte(requestedDay)
          .lte(nextDay);
      }

      // If not admin return only specified role
      if (req.query.role && req.query.role !== 'admin') {
        query.where('role_of_creator').equals(req.query.role);
      }

      // If a limit is defined add it to the query
      if (req.query.limit) {
        query.limit(parseInt(req.query.limit, 10));
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
        } else { // Else all's good, send results
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
