(function() {
  'use strict';

  var app = require('../../app'),
    should = require('should'),
    request = require('supertest'),
    loginHelper = require('./helpers/login'),
    seeder = require('./helpers/seeder'),
    Tags = require('../../server/models/tags'),
    adminToken, adminId,
    userToken, userId,
    unauthorizedId, unauthorizedToken,
    documentId;

  describe('Documents', function() {
    before(function(done) {
      seeder(function(error, documents) {
        if (error) {
          throw (error);
        } else {
          loginHelper.admin(function(error, res) {
            if (error) {
              throw error;
            } else {
              adminToken = res.body.token;
              adminId = res.body._id;
              loginHelper.user(function(error, res) {
                if (error) {
                  throw error;
                } else {
                  userToken = res.body.token;
                  userId = res.body._id;
                  for (var i = 0; i < documents.length; i++) {
                    if (documents[i].accessibleBy.indexOf('user') > -1) {
                      documentId = documents[i]._id;
                      break;
                    }
                  }
                  done();
                }
              });
            }
          });
        }
      });
    });

    describe('Creates a new document', function() {
      it('document created has the correct date', function(done) {
        request(app)
          .post('/documents')
          .set('x-access-token', adminToken)
          .send({
            title: 'Admin test document',
            content: 'I am an admin testing out the date field',
            tags: ['business']
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            var now = new Date().getTime();
            var created = new Date(res.body.createdAt);
            should.not.exist(error);
            (res.status).should.equal(200);
            should.exist(created);
            (now - created).should.be.greaterThan(0);
            done();
          });
      });

      it('document created defines access roles', function(done) {
        request(app)
          .post('/documents')
          .set('x-access-token', userToken)
          .send({
            title: 'User test document',
            content: 'I am a user testing out the date field',
            accessibleBy: ['user']
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            (res.body).should.be.an.Object;
            (res.body.accessibleBy).should.be.an.Array;
            (res.body.accessibleBy[0]).should.containEql('user');
            done();
          });
      });

      it('inserts newly defined tag', function(done) {
        request(app)
          .post('/documents')
          .set('x-access-token', userToken)
          .send({
            title: 'User test tags',
            content: 'I am a user testing out tag creation',
            tags: ['newTag'],
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.body).should.be.an.Object;
            Tags.find({}, function(error, tags) {
              (tags).should.be.an.Array;
              (tags.length).should.equal(3);
              (tags[2].title).should.containEql('newTag');
              done();
            });
          });
      });
    });

    describe('Returns all documents', function() {
      it('sorts all the documents in descending order by date', function(done) {
        request(app)
          .get('/documents?page=0')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var documentCreated = new Date(res.body[i].createdAt);
              var nextDocumentCreated = new Date(res.body[i + 1].createdAt);
              // It was created after the next document in the array
              (documentCreated - nextDocumentCreated).should.not.be.lessThan(0);
            }
            done();
          });
      });

      it('sorts paginated in descending order by date', function(done) {
        request(app)
          .get('/documents?limit=10&page=5')
          .set('x-access-token', userToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            (res.body).should.be.an.Array;
            (res.body.length).should.equal(10)
              // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var documentCreated = new Date(res.body[i].created_at);
              var nextDocumentCreated = new Date(res.body[i + 1].created_at);
              // It was created after the next documcent in the array
              (documentCreated - nextDocumentCreated).should.not.be.lessThan(0);
            }
            done();
          });
      });

      it('sorts limited in descending order by date', function(done) {
        request(app)
          .get('/documents?limit=10')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var documentCreated = new Date(res.body[i].created_at);
              var nextDocumentCreated = new Date(res.body[i + 1].created_at);
              // It was created after the next documcent in the array
              (documentCreated - nextDocumentCreated).should.not.be.lessThan(0);
            }
            done();
          });
      });
    });

    describe('Updates a document (PUT /documents/:id)', function() {
      it('updates a document and returns new details', function(done) {
        request(app)
          .put('/documents/' + documentId)
          .send({
            title: 'A real title',
            content: 'Some real content',
          })
          .set('x-access-token', userToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Object;
            (res.body.title).should.containEql('A real title');
            (res.body.content).should.containEql('Some real content');
            done();
          });
      });

      it('adds roles which can access it', function(done) {
        request(app)
          .put('/documents/' + documentId)
          .send({
            accessibleBy: ['admin', 'user']
          })
          .set('x-access-token', userToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Object;
            (res.body.accessibleBy).should.containEql('admin');
            done();
          });
      });

      it('returns error message for unauthorized user', function(done) {
        loginHelper.unauthorized(function(error, res) {
          if (error) {
            throw error;
          } else {
            unauthorizedToken = res.body.token;
            unauthorizedId = res.body._id;
            request(app)
              .put('/documents/' + documentId)
              .set('x-access-token', unauthorizedToken)
              .set('Accept', 'application/json')
              .end(function(error, res) {
                should.not.exist(error);
                (res.status).should.equal(401);
                (res.body.success).should.equal(false);
                (res.body.message).should.containEql('Not authorized to access');
                done();
              });
          }
        });
      });

      it('returns fail message on non existent document', function(done) {
        request(app)
          .put('/documents/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Document does not exist');
            done();
          });
      });

      it('responds with a server error on invalid object ID', function(done) {
        request(app)
          .put('/documents/' + 'nonValidId')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(500);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('reading from the database');
            done();
          });
      });
    });

    describe('Returns documents based on ID (GET /documents/<id>)', function() {
      it('returns expected document', function(done) {
        request(app)
          .get('/documents/' + documentId)
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            should.exist(res.body.content);
            should.exist(res.body.title);
            done();
          });
      });

      it('returns with error message for unauthorized user', function(done) {
        loginHelper.unauthorized(function(error, res) {
          if (error) {
            throw error;
          } else {
            unauthorizedToken = res.body.token;
            unauthorizedId = res.body._id;
            request(app)
              .get('/documents/' + documentId)
              .set('x-access-token', unauthorizedToken)
              .set('Accept', 'application/json')
              .end(function(error, res) {
                should.not.exist(error);
                (res.status).should.equal(401);
                (res.body.success).should.equal(false);
                (res.body.message).should.containEql('Not authorized to access');
                done();
              });
          }
        });
      });

      it('responds with a server error on invalid object ID', function(done) {
        request(app)
          .get('/documents/' + 'nonValidId')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(500);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('reading from the database');
            done();
          });
      });

      it('returns fail message on non existent document', function(done) {
        request(app)
          .get('/documents/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Document does not exist');
            done();

          });
      });
    });
  });

  describe('Deletes a document (DELETE /documents/:id)', function() {
    it('returns error message for unauthorized user', function(done) {
      loginHelper.unauthorized(function(error, res) {
        if (error) {
          throw error;
        } else {
          unauthorizedToken = res.body.token;
          unauthorizedId = res.body._id;
          request(app)
            .put('/documents/' + documentId)
            .set('x-access-token', unauthorizedToken)
            .set('Accept', 'application/json')
            .end(function(error, res) {
              should.not.exist(error);
              (res.status).should.equal(401);
              (res.body.success).should.equal(false);
              (res.body.message).should.containEql('Not authorized to access');
              done();
            });
        }
      });
    });

    it('deletes a document', function(done) {
      request(app)
        .delete('/documents/' + documentId)
        .set('x-access-token', userToken)
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body._id).should.containEql(documentId);
          done();
        });
    });

    it('responds with a server error on invalid object ID', function(done) {
      request(app)
        .delete('/documents/' + 'nonValidId')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          res.status.should.equal(500);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('reading from the database');
          done();
        });
    });

    it('returns fail message on non existent document', function(done) {
      request(app)
        .delete('/documents/' + '573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Document does not exist');
          done();
        });
    });
  });
})();
