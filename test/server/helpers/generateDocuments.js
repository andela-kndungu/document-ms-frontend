import Users from '../../../server/models/users';

const ownerIds = [];
const accessBy = [
  ['user'],
  ['admin']
];
const tags = [
  [],
  ['education'],
  ['business']
];

const generate = () => {
  const generatedDocuments = [];

  // Generate 200 documents
  for (let i = 0; i < 200; i++) {
    const ownersRandomIndex = Math
      .floor(Math.random() * ownerIds.length);
    const accessibleByIndex = Math
      .floor(Math.random() * accessBy.length);
    const tagsIndex = Math
      .floor(Math.random() * tags.length);

    generatedDocuments.push({
      // Random five character string
      title: Math.random().toString().substring(2, 7),

      // Random repeats of 15 character strings
      content: (`${Math.random().toString().substring(2)} `)
      .repeat(Math.floor((Math.random() * 20) + 1)),

      // Random owner_id chosen from array of available owner_ids
      owner: ownerIds[ownersRandomIndex],
      accessibleBy: accessBy[accessibleByIndex],
      tags: tags[tagsIndex]
    });
  }

  return generatedDocuments;
};

module.exports = (callback) => {
  Users.find().exec((error, users) => {
    if (error) {
      throw error;
    } else {
      users.forEach((user) => {
        ownerIds.push(user._id);
      });
    }
  })
    .then(() => {
      callback(null, generate());
    }, (error) => {
      callback(error);
    });
};

