var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../models/users');

// Define a "Table"
var DocumentsSchema = new Schema({
  owner_id: {
    type: String,
    required: [true, 'An owner id must be provided'],
  },
  title: {
    type: String,
    required: [true, 'A title must be provided'],
  },
  content: {
    type: String,
    required: [true, 'Some content must be provided']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  category: {
    type: String,
    required: [true, 'A category must be provided'],
    ref: 'Categories'
  },
  role_of_creator: {
    type: String,
  }
});

// To enable searching of documents by role
DocumentsSchema.pre('save', function(next) {
  var document = this;
  Users.findById(document.owner_id)
    .populate('role')
    .exec(function(error, user) {
      if (user) {
        document.role_of_creator = user.role.title;
      }
      next();
    });
});

module.exports = mongoose.model('Documents', DocumentsSchema);
