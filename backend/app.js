const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '61b99b9d7390f52569b04fd0',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: `Route ${req.url} Not found.` });
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error.' });
  next();
});

app.listen(PORT, () => {
  console.log('Link to the server');
  console.log(BASE_PATH);
});
