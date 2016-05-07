var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  }
});

module.exports = mongoose.model('Documents', DocumentsSchema);
