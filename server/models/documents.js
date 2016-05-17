(function() {
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

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

    tags: {
      type: Array,
      default: []
    },

    accessRoles: {
      type: Array,
      default: []
    }
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

  module.exports = mongoose.model('Documents', DocumentsSchema);
})();
