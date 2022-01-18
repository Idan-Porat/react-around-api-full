const jwt = require('jsonwebtoken'); // importing the jsonwebtoken module
const bcrypt = require('bcryptjs'); // importing bcrypt
const User = require('../models/users');
const ErrorHandler = require('../middleware/errorHandler');

const STAT_CODE_200 = 200;
const ERR_CODE_400 = 400;
const ERR_CODE_401 = 401;
const ERR_CODE_404 = 404;
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => User.find({})
  .then((user) => {
    if (!user) {
      throw new ErrorHandler('No users found', ERR_CODE_404);
    }
    res.status(STAT_CODE_200).send(user);
  })
  .catch(next);

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('No user with matching ID found', ERR_CODE_404);
      }
      res.status(STAT_CODE_200).send(user);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  // eslint-disable-next-line object-shorthand
  return User.findOne({ _id: _id })
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('No user with matching ID found', ERR_CODE_404);
      }
      res.status(STAT_CODE_200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email: req.body.email, password: hash }))
    .then((data) => {
      res.status(STAT_CODE_200).send({
        email: data.email,
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id,
      });
    })
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('Unsuccessful Request', ERR_CODE_400);
      }
      res.status(STAT_CODE_200).send({ user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('Unsuccessful Request', ERR_CODE_400);
      }
      res.status(STAT_CODE_200).send({ user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('Unsuccessful Request', ERR_CODE_400);
      }
      res.status(STAT_CODE_200).send({ user });
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'prodaction' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      // we return the token
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(ERR_CODE_401)
        .send({ message: err.message });
    });
};
