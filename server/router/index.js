// To process token
var jwt = require('jsonwebtoken');

// Get the routes
var publicRoutes = require('./routes/public');
var usersRoutes = require('./routes/users');
var rolesRoutes = require('./routes/roles');
var categoriesRoutes = require('./routes/categories');
var documentsRoutes = require('./routes/documents');

// Middleware to protect sensitive routes
var authenticateUser = function(req, res, next) {
  // Get token in the request header
  var token = req.headers['x-access-token'];

  // If there is a token
  if (token) {
    // Decode token with the secret key
    jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
      // Perhaps a forged token
      if (error) {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        // If it checks out save in request object for others to use
        req.decoded = decoded;

        // Pass it over to the next function
        next();
      }
    });

  } else {
    // No token provided
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

module.exports = function(app) {
  // Use routes above based on route visited by user
  app.use('/', publicRoutes);

  // Protect sensitive routes
  app.use(authenticateUser);
  app.use('/users', usersRoutes);
  app.use('/roles', rolesRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/documents', documentsRoutes);
};
