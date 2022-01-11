const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT = 3000, BASE_PATH } = process.env;
console.log(process.env.NODE_ENV);
const app = express();
app.use(helmet());
app.use(cors());
app.options("*",cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://around-porat.students.nomoreparties.sbs"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept, authorization, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Credentials",
     true
  );
  next();
})

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(requestLogger);

app.post('/signup', createUser);
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
