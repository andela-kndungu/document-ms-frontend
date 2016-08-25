import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },

  name: {
    first: {
      type: String,
      required: [true, 'A first name must be provided'],
    },
    last: {
      type: String,
      required: [true, 'A last name must be provided'],
    },
  },

  email: {
    type: String,
    required: [true, 'An email must be provided'],
    unique: true,
  },

  password: {
    type: String,
  },

  roles: {
    type: Array,
    default: ['user'],
  },

  google: {
    id: {
      type: String,
    },
    token: {
      type: String,
    },
  },

  github: {
    id: {
      type: String,
    },
    token: {
      type: String,
    },
  },

  photo: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

UserSchema.pre('save', function hash(next) {
  // To be able to access the user object from within the bcrypt function
  const user = this;
  if (user.password) {
    // Replace provided plain text password with hashed one
    bcrypt.hash(user.password, null, null, (error, hashedPassword) => {
      if (error) {
        const err = new Error('Something went wrong hashing password');
        next(err);
      } else {
        user.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// Validate hashed password
UserSchema.methods.validatePassword = function valid(password, callback) {
  // To be able to access the object from within the bcrypt function
  const user = this;
  bcrypt.compare(password, user.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
};

module.exports = mongoose.model('Users', UserSchema);
