var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Define a "Table"
var RoleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A role title must be provided'],
    unique: true
  },
});

module.exports = mongoose.model('Role', RoleSchema);
