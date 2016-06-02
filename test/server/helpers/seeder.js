(function() {
  'use strict';

  var Users = require('../../../server/models/users'),
    Roles = require('../../../server/models/roles'),
    Tags = require('../../../server/models/tags'),
    Documents = require('../../../server/models/documents'),
    seeds = require('./seedData'),
    generateDocuments = require('./generateDocuments');

  // Redefine the return value of Model.create to be a promise
  var mongoose = require('mongoose');
  mongoose.Model.seed = function(insertArray) {
    var promise = new mongoose.Promise();
    this.create(insertArray, function(error) {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });
    return promise;
  };

  module.exports = function(callback) {
    Users.remove()
      .exec()
      .then(function() {
        return Roles.remove().exec();
      })
      .then(function() {
        return Tags.remove().exec();
      })
      .then(function() {
        return Documents.remove().exec();
      })
      .then(function() {
        return Roles.seed(seeds.roles);
      })
      .then(function() {
        return Users.seed(seeds.users);
      })
      .then(function() {
        return Tags.seed(seeds.tags);
      })
      .then(function() {
        generateDocuments(function(error, documents) {
          if (error) {
            throw error;
          } else {
            Documents.seed(documents)
              .then(function() {
                Documents.find({}, function(error, documents) {
                  callback(null, documents);
                  console.log('Successfully seeded data');
                });
              });
          }
        });
      }, function(error) {
        callback(error);
      });
  };
})();
