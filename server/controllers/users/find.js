import Users from '../../models/users.js';
import Documents from '../../models/documents.js';

const find = {};

find.id = (req, res) => {
  Users.findById(req.params.id, (error, user) => {
    // Inform user of errors with the database
    if (error) {
      // console.log(req.params.id)
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database',
      });
    }

    // Success, return retrieved user
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

find.all = (req, res) => {
  // Get all entries in the users model
  Users.find({}, (error, users) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database',
      });
    }

    // Success, return retrieved users with success message
    return res.json(users);
  });
};

find.documents = (req, res) => {
  // Get all documents with specified owner_id
  Documents.find({
    owner: req.params.id,
  }, (error, documents) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database',
      });
    }

    // Success, return retrieved documents with success message
    return res.json(documents);
  });
};

export default find;

