import Documents from '../../models/documents.js';
import authorised from '../helpers/authorise.js';
import filter from './filter.js';

const find = {};

find.id = (req, res) => {
  Documents.findById(req.params.id, (error, document) => {
    // Inform user of errors with the database
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'There was an error reading from the database'
      });
    }

    // Document returieved, authorise before sending to user
    if (document) {
      if (authorised(req, document)) {
        return res.json(document);
      }
      // User not authorized
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access document'
      });
    }
    // Failed, no document with specified ID
    return res.status(404).json({
      success: false,
      message: 'Document does not exist',
    });
  });
};

// Retrieve all documents
find.all = (req, res) => {
  let status;
  let body;

  // Roles of user trying to access document
  const rolesOfUser = req.user.roles;

  // Users can only access public documents or those
  // belonging to a role they are assigned
  const query = Documents.find({
    $or: [{
      accessibleBy: 'user'
    }, {
      accessibleBy: {
        $in: rolesOfUser
      }
    }]
  });

  query.populate('owner');

  // Return documents created on a specific day
  if (req.query.date) {
    const nextDay = new Date();
    const requestedDay = new Date(req.query.date);
    nextDay.setDate(requestedDay.getDate() + 1);
    query.where('createdAt')
      .gte(requestedDay)
      .lt(nextDay);
  }

  // Returns all documents in requested tag
  if (req.query.tag) {
    // Find requested tag in the Tags model
    query.where('tags').in([req.query.tag]);
  }

  // Returns all documents in requested role
  if (req.query.role) {
    query.where('accessibleBy').equals(req.query.role);
  }

  // Number of documents to be returned
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

  // Start page
  const page = req.query.page ? parseInt(req.query.page, 10) : undefined;

  // If a specific page is requested with a limit
  if (page) {
    // Move the cursor of the query result to skip
    const skip = page > 0 ? ((page - 1) * limit) : 0;
    query.skip(skip);
  }

  // If a limit is defined add it to the query
  if (limit) {
    query.limit(limit);
  }

  // Sort by date in descendig order (latest first)
  query.sort({
    createdAt: -1
  });

  // Execute the query and return the results
  query.exec((error, documents) => {
    // Inform user of errors with the database
    if (error) {
      status = 500;
      body = {
        success: false,
        message: 'There was a databse error'
      };
    }

    if (req.query.username) {
      documents = documents.filter((document) => {
        return document.owner.username === req.query.username;
      });
    }

    // Return result
    status = status || 200;
    body = body || documents;
    res.status(status).json(body);
  });
};

find.public = (req, res) => {
  const query = Documents.find({ accessibleBy: 'user' });

  query.populate('owner');

  // Sort by date in descendig order (latest first)
  query.sort({
    createdAt: -1

  });

  // Execute the query and return the results
  query.exec((error, documents) => {
    // Inform user of errors with the database
    if (error) {
      documents = {
        success: false,
        message: 'There was a databse error'
      };
    }
    res.json(documents);
  });
};

export default find;

