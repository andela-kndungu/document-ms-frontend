import Users from '../../models/users.js';

const destroy = (req, res) => {
  // Find user to delete
  Users.findByIdAndRemove(req.params.id, (error, user) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database',
      });
    }

    // User deleted, return success message
    if (user) {
      return res.json(user);
    }

    // Failed, no user with specified ID
    return res.status(404).json({
      success: false,
      message: 'User does not exist',
    });
  });
};

export default destroy;

