(function() {
  'use strict';
  module.exports = {
    users: [{
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
