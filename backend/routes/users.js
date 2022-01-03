const userRouter = require('express').Router();
const {
  getUser, getAllUsers, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);
module.exports = userRouter;
