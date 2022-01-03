const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: 'Enter your name',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: 'Enter your career',
  },
  avatar: {
    type: String,
    required: 'URL must be valid',
  },
});

userSchema.path('avatar').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('user', userSchema);
