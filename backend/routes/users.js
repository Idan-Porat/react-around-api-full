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
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object()
    .keys({
      avatar: Joi.string().hex().required(),
    }).unknown(true),
}), updateAvatar);
module.exports = userRouter;
