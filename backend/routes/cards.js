const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('');

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageLink: Joi.string().required().custom(validateUrl),
  }).unknown(true)
}), createPost);
cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;
