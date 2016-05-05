var Users = require('../models/users');
var parseError = require('./parseError');

module.exports = {
  addUser: function(req, res) {
    // Declare new instance of the Users "table"
    var user = new Users();

    // Define values of the new "row" to add
    user.username = req.body.username;
    user.name.first = req.body.firstName;
    user.name.last = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    user.save(function(error) {
      if (error) {
        parseError(res, error);
      } else {
        // Return send success message
        res.json({
          success: true,
          message: 'User created successfully'
        });
      }
    });
  },
  getAll: function(req, res) {
    // Get all entries in the users "table"
    Users.find({}, function(error, users) {
      //  Inform user if anything goes wrong
      if (error) {
        res.status(500);
        res.send('There was an error reading from the database');
      } else {
        // Else all's good, send results
        res.json(users);
      }
    });
  },
};
