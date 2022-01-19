const cardRouter = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().hex().required().min(4),
  }).unknown(true),
}), createCard);
cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object()
    .keys({
      cardId: Joi.string().hex().required(),
    }).unknown(true),
}), deleteCard);
cardRouter.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object()
    .keys({
      cardId: Joi.string().hex().required(),
    }).unknown(true),
}), likeCard);
cardRouter.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object()
    .keys({
      cardId: Joi.string().hex().required(),
    }).unknown(true),
}), dislikeCard);

module.exports = cardRouter;
