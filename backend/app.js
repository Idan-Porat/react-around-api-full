const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { validateUrl } = require('./middleware/validateUrl');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.use(helmet());
app.use(cors({
  origin: 'https://around-porat.students.nomoreparties.sbs',
}));
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
    email: Joi.string().email().custom(validateUrl),
    password: Joi.string().required().min(3),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().custom(validateUrl),
    password: Joi.string().required().min(3),
  }),
}), login);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use(errorLogger); // enabling the error logger
app.use(errors());

app.use((req, res, next) => {
  res.status(404).send({ message: `Route ${req.url} Not found.` });
  next();
});
app.use((err, req, res) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Link to the server ${PORT}`);
  console.log(BASE_PATH);
});
