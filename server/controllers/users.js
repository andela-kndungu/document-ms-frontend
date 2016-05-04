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

  }
};
