import Users from '../../models/users.js';
import parseError from '../parseError.js';

const update = (req, res) => {
  // Get the user to update
  Users.findById(req.params.id, (error, user) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database',
      });
    }

    if (user) {
      Object.keys(req.body).forEach((property) => {
        // Special cases for first and last names
        if (property === 'firstName') {
          user.name.first = req.body.firstName;
        } else if (property === 'lastName') {
          user.name.last = req.body.lastName;
        } else {
          user[property] = req.body[property];
        }
      });

      // Save the updated user
      user.save((saveError) => {
        // Parse any error and pass on to user
        if (saveError) {
          return parseError(res, saveError);
        }

        // User updated, return updated user
        return res.json(user);
      });
    } else {
      // Failed, no document with specified ID
      return res.status(404).json({
        success: false,
        message: 'User does not exist',
      });
    }
  });
};

export default update;

