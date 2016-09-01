import _ from 'lodash';

module.exports = (req, document) => {
  // User's roles
  const userRoles = req.user.roles;

  // Roles which can access the document
  const documentRoles = document.accessibleBy;

  // Check whether the user is authorized to access the document
  return _.intersection(userRoles, documentRoles).length > 0;
};

