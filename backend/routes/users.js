const userRouter = require('express').Router();
const {
  getUser, getAllUsers, updateProfile, getCurrentUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', getUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);
module.exports = userRouter;
