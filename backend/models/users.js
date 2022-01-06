const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const validateUrl = require('../middleware/validateUrl')
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password, ((err) => {
        if (!password) {
          return Promise.reject(new Error(err.name));
        }
        return password;
      }))
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};
userSchema.path('avatar').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('user', userSchema);
