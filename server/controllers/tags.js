import Tags from '../models/tags';
import parseError from './parseError';

module.exports = {
  // Add a new tag
  create: (req, res) => {
    // Declare new instance of the Tags model
    const tag = new Tags();

    // Define values of the new object to add
    tag.title = req.body.title;

    // Save the new tag parsing the error if request is invalid
    tag.save((error) => {
      if (error) {
        return parseError(res, error);
      }

      // Tag created, return created tag
      return res.json(tag);
    });
  },

  // Handle all get requests for tags
  find: {
    // Retrieve by ID
    id: (req, res) => {
      Tags.findById(req.params.id, (error, tag) => {
        // Inform user of errors with the database
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        }

        // Success, return retrieved tag with success message
        if (tag) {
          return res.json(tag);
        }

        // Failed, no tag with specified ID
        return res.status(404).json({
          success: false,
          message: 'Tag does not exist',
        });
      });
    },

    // Retrieve all tags
    all: (req, res) => {
      // Get all entries in the tags model
      Tags.find({}, (error, tags) => {
        // Inform user of errors with the database
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        }

        // Success, return retrieved tags with success message
        return res.json(tags);
      });
    }
  },

  // Update tag by ID
  update: (req, res) => {
    // Get the tag to update
    Tags.findById(req.params.id, (error, tag) => {
      // Inform user of errors with the database
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'There was an error reading from the database'
        });
      }

      // Tag found, update it
      if (tag) {
        // For each property sent in the body
        Object.keys(req.body).forEach((property) => {
          // Update the tag
          tag[property] = req.body[property];
        });

        // Save the updated tag
        tag.save((error) => {
          // Parse any error and pass on to user
          if (error) {
            return parseError(res, error);
          }

          // Tag updated, return success message
          return res.json(tag);
        });
      } else {
        // Failed, no document with specified ID
        return res.status(404).json({
          success: false,
          message: 'Tag does not exist',
        });
      }
    });
  },

  // Delete specified tag
  destroy: (req, res) => {
    // Get user's role from the decoded token
    const usersRoles = req.user.roles;
    if (usersRoles.indexOf('admin') > -1) {
      // Find tag to delete
      Tags.findByIdAndRemove(req.params.id, (error, tag) => {
        // Inform user of errors with the database
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        }

        // Tag deleted, return deleted tag
        if (tag) {
          return res.json(tag);
        }

        // Failed, no tag with specified ID
        return res.status(404).json({
          success: false,
          message: 'Tag does not exist',
        });
      });
    } else {
      // User is not authorised to carry out operaion
      return res.status(403).json({
        success: false,
        message: 'Not authorised to delete a tag'
      });
    }
  }
};

