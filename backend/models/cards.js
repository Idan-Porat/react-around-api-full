const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: 'Enter your card title',
  },
  imageLink: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Please enter a valid URL'
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'There is must be user id',
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.path('imageLink').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('card', cardSchema);
