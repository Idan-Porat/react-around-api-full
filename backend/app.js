const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const ErrorHandler = require('./middleware/errorHandler');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://around-porat.students.nomoreparties.sbs',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept, authorization, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Credentials',
    true,
  );
  next();
});

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use(errorLogger); // enabling the error logger
app.use(errors());

userRouter.get('*', userRouter);
cardRouter.get('*', cardRouter);

app.use((err, req, res, next) => {
  res.send(() => {
    throw new ErrorHandler('An error occurred on the server', 500);
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Link to the server ${PORT}`);
  console.log(BASE_PATH);
});
