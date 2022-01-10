const Card = require('../models/cards');

const STAT_CODE_200 = 200;
const ERR_CODE_400 = 400;
const ERR_CODE_404 = 404;
const ERR_CODE_500 = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('No card found');
      error.statusCode = ERR_CODE_404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => {
      res.status(STAT_CODE_200).send(card);
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

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const {
    name, imageLink,
  } = req.body;
  Card.create(
    {
      name, imageLink, owner: _id,
    },
  )
    .orFail(() => {
      const error = new Error('Invalid data');
      error.statusCode = ERR_CODE_400;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => res.status(STAT_CODE_200).send( card ))
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

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = ERR_CODE_404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => res.send( card ))
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

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } }, // add _id to the array if it's not there yet
    { new: true },
  ).orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = ERR_CODE_404;
    throw error; // Remember to throw an error so .catch handles it instead of .then
  })
    .then((card) => res.send(card))
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

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } }, // remove _id from the array
    { new: true },
  ).orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = ERR_CODE_404;
    throw error; // Remember to throw an error so .catch handles it instead of .then
  })
    .then((card) => res.send(card))
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
