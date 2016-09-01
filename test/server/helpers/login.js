import request from 'supertest';
import app from '../../../server';

module.exports = {
  admin: (callback) => {
    request(app)
      .post('/api/users/login')
      .send({
        username: 'admin',
        password: 'adminPassword'
      })
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) {
          callback(error);
        } else {
          callback(null, res);
        }
      });
  },

  user: (callback) => {
    request(app)
      .post('/api/users/login')
      .send({
        username: 'user',
        password: 'userPassword'
      })
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) {
          callback(error);
        } else {
          callback(null, res);
        }
      });
  },

  unauthorized: (callback) => {
    request(app)
      .post('/api/users/login')
      .send({
        username: 'unauthorized',
        password: 'unauthorizedPassword'
      })
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) {
          callback(error);
        } else {
          callback(null, res);
        }
      });
  }
};

