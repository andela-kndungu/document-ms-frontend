var Users = require('../../../server/models/users');
var Categories = require('../../../server/models/categories');
var ownerIds = [];
var categoriesArray = [];

var generate = function() {
  var generatedDocuments = [];
  // Generate 200 documents
  for (var i = 0; i < 200; i++) {
    generatedDocuments.push({
      // Random five character string
      title: Math.random().toString().substring(2, 7),
      // Random repeats of 15 character strings
      content: (Math.random().toString().substring(2) + ' ')
        .repeat(Math.floor(Math.random() * 20 + 1)),
      // Random owner_id chosen from array of available owner_ids
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      category: categoriesArray[Math.floor(Math.random() * ownerIds.length)]
    });
  }
  return generatedDocuments;
};



  module.exports = function(callback) {
    Users.find().exec(function(error, users) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          users.forEach(function(user) {
            ownerIds.push(user._id);
          });
        }
      }).then(function() {
        return Categories.find().exec(function(error, categories) {
          if (error) {
            console.log(error);
            throw(error);
          } else {
            categories.forEach(function(category) {
              categoriesArray.push(category.title);
            });
          }
        });
      })
      .then(function() {
        callback(null, generate());
      }, function(error) {
        callback(error);
      });
  };
