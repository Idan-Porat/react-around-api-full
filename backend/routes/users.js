const userRouter = require('express').Router();
const {
  getUser, getAllUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);
module.exports = userRouter;
