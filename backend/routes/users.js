const userRouter = require('express').Router();
const {
  getUser, getAllUsers, updateProfile, getCurrentUser, updateAvatar,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);
module.exports = userRouter;
