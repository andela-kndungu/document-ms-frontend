import Documents from '../../models/documents.js';
import authorised from '../helpers/authorise.js';

// Delete specified document
const destroy = (req, res) => {
  // Find document to delete
  Documents.findById(req.params.id, (error, document) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database'
      });
    }

    // Document found, confirm user has access to it
    if (document) {
      if (authorised(req, document)) {
        Documents.findByIdAndRemove(req.params.id, (e, d) => {
          if (!e) {
            return res.json(d);
          }
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

export default destroy;

