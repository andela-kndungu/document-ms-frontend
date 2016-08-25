import Documents from '../../models/documents.js';
import authorised from '../helpers/authorise.js';
import parseError from '../parseError.js';

// Update document by ID
const update = (req, res) => {
  // Get the document to update
  Documents.findById(req.params.id, (error, document) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database'
      });
    }

    // Document found, update it if user is authorised
    if (document) {
      if (authorised(req, document)) {
        // For each property sent in the body
        Object.keys(req.body).forEach((property) => {
          // Update the document
          document[property] = req.body[property];
        });

        // Save the updated document
        document.save((error) => {
          // Parse any error and pass on to user
          if (error) {
            return parseError(res, error);
          }
          // Document updated, return updated document
          return res.json(document);
        });
      } else {
        // User not authorized
        return res.status(401).json({
          success: false,
          message: 'Not authorized to access document'
        });
      }
    } else {
      // Failed, no document with specified ID
      return res.status(404).json({
        success: false,
        message: 'Document does not exist',
      });
    }
  });
};

export default update;

