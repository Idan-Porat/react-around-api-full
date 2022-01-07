const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { register, login } = require('./controllers/users');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.post(bodyParser.urlencoded({ extended: false }));
app.post(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(requestLogger);

app.post('/signup', register);
app.post('/signin', login);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use(errorLogger); // enabling the error logger
app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
});

app.listen(PORT, () => {
  console.log(`Link to the server ${PORT}`);
  console.log(BASE_PATH);
});
