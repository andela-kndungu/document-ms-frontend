(function() {
  'use strict';

  var Users = require('../../../server/models/users');
  module.exports = {
    users: function(callback) {
      Users.remove({}, function() {

        Users.create([{
          'username': 'first',
          'name': {
            'first': 'First',
            'last': 'User'
          },
          'email': 'first@user.com',
          'password': 'firstPassword',
          'role': 'admin'
        }, {
          'username': 'second',
          'name': {
            'first': 'Second',
            'last': 'User'
          },
          'email': 'second@user.com',
          'password': 'secondPassword',
          'role': 'user'
        }], function(error, users) {
          if (error) {
            console.log('Could not seed users' + error);
            callback(null);
          } else {
            console.log('Successfully seeded users');
            callback(null, users);
          }
        });
      });

    }
  };
})();
