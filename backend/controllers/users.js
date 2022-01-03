const User = require('../models/users');

const STAT_CODE_200 = 200;
const ERR_CODE_400 = 400;
const ERR_CODE_404 = 404;
const ERR_CODE_500 = 500;

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('users not found');
      error.statusCode = ERR_CODE_404;
      throw error;
    })
    .then((user) => {
      res.status(STAT_CODE_200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_CODE_400).send(err);
      } else if (err.statusCode === ERR_CODE_404) {
        res.status(ERR_CODE_404).send(err);
      } else {
        res.status(ERR_CODE_500).send({ err } || 'internal server error');
      }
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = ERR_CODE_404;
      throw error;
    })
    .then((user) => {
      res.status(STAT_CODE_200).send({ data: `${user.name} is a ${user.about}` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_CODE_400).send(err);
      } else if (err.statusCode === ERR_CODE_404) {
        res.status(ERR_CODE_404).send(err);
      } else {
        res.status(ERR_CODE_500).send({ err } || 'internal server error');
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = ERR_CODE_404;
      throw error;
    })
    .then((user) => res.status(STAT_CODE_200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_CODE_400).send(err);
      } else if (err.statusCode === ERR_CODE_404) {
        res.status(ERR_CODE_404).send(err);
      } else {
        res.status(ERR_CODE_500).send({ err } || 'internal server error');
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(() => {
    const error = new Error('user not found');
    error.statusCode = ERR_CODE_404;
    throw error;
  })
    .then((user) => res.status(STAT_CODE_200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_CODE_400).send(err);
      } else if (err.statusCode === ERR_CODE_404) {
        res.status(ERR_CODE_404).send(err);
      } else {
        res.status(ERR_CODE_500).send({ err } || 'internal server error');
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(() => {
    const error = new Error('user not found');
    error.statusCode = ERR_CODE_404;
    throw error;
  })
    .then((user) => res.status(STAT_CODE_200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_CODE_400).send(err);
      } else if (err.statusCode === ERR_CODE_404) {
        res.status(ERR_CODE_404).send(err);
      } else {
        res.status(ERR_CODE_500).send({ err } || 'internal server error');
      }
    });
};
