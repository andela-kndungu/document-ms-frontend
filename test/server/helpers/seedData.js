(function() {
  'use strict';
  module.exports = {
    users: [{
      'username': 'admin',
      'name': {
        'first': 'Admin',
        'last': 'User'
      },
      'email': 'first@user.com',
      'password': 'adminPassword',
      'role': 'admin'
    }, {
      'username': 'user',
      'name': {
        'first': 'User',
        'last': 'User'
      },
      'email': 'second@user.com',
      'password': 'userPassword',
      'role': 'user'
    }],
    roles: [{
      'title': 'admin',
    }, {
      'title': 'user',
    }],
    categories: [{
      'title': 'education',
    }, {
      'title': 'business',
    }]
  };

})();
