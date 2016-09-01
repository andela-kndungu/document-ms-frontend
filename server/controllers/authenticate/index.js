// To process token
import jwt from 'jsonwebtoken';

// Middleware to protect sensitive routes
module.exports = {
  token: (req, res, next) => {
    // Get token in the request header
    const token = req.headers['x-access-token'];

    // If there is a token
    if (token) {
      // Decode token with the secret key
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        // When token is not valid
        if (error) {
          // Set status to unauthorized and return fail json
          return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token'
          });
        }
        // Valid, save decoded object for possibly other routes to use
        req.user = decoded;

        // Pass control over to the next function
        next();
      });
    } else {
      // No token provided, set status to unauthorized and return fail json
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
  }
};

