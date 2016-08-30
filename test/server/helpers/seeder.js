import mongoose from 'mongoose';
import Users from '../../../server/models/users';
import Roles from '../../../server/models/roles';
import Tags from '../../../server/models/tags';
import Documents from '../../../server/models/documents';
import seeds from './seedData';
import generateDocuments from './generateDocuments';

// Redefine the return value of Model.create to be a promise
mongoose.Model.seed = function (insertArray) {
  const promise = new mongoose.Promise();
  this.create(insertArray, (error) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  return promise;
};

module.exports = (callback) => {
  Users.remove()
    .exec()
    .then(() => {
      return Roles.remove().exec();
    })
    .then(() => {
      return Tags.remove().exec();
    })
    .then(() => {
      return Documents.remove().exec();
    })
    .then(() => {
      return Roles.seed(seeds.roles);
    })
    .then(() => {
      return Users.seed(seeds.users);
    })
    .then(() => {
      return Tags.seed(seeds.tags);
    })
    .then(() => {
      generateDocuments((error, documents) => {
        if (error) {
          throw error;
        } else {
          Documents.seed(documents)
            .then(() => {
              Documents.find({}, (error, documents) => {
                callback(null, documents);
                console.log('Successfully seeded data');
              });
            });
        }
      });
    }, (error) => {
      callback(error);
    });
};
