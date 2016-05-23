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
      'roles': ['admin']
    }, {
      'username': 'user',
      'name': {
        'first': 'User',
        'last': 'User'
      },
      'email': 'second@user.com',
      'password': 'userPassword',
      'roles': ['user']
    }, {
      'username': 'unauthorized',
      'name': {
        'first': 'Unauthorized',
        'last': 'User'
      },
      'email': 'unauthorized@user.com',
      'password': 'unauthorizedPassword',
      'roles': ['unauthorized']
    }],
    roles: [{
      'title': 'admin',
    }, {
      'title': 'user',
    }],
    tags: [{
      'title': 'education',
    }, {
      'title': 'business',
    }]
  };

})();
