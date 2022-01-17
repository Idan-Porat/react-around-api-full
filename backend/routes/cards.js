const cardRouter = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateUrl } = require('../middleware/validateUrl');

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageLink: Joi.string().required().custom(validateUrl),
  }),
}), createCard);
cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    owner: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }).unknown(true),
}), deleteCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;
