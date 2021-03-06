const userRouter = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const {
  getUser, getAllUsers, updateProfile, getCurrentUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object()
    .keys({
      userId: Joi.string().hex().required(),
    }).unknown(true),
}), getUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }).unknown(true),
  }).unknown(true),
}), updateProfile);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
      avatar: Joi.string().required(),
    }).unknown(true),
  }).unknown(true),
}), updateAvatar);
module.exports = userRouter;
