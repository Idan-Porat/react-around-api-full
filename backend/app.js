const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth); // all the routes below this string will be secured

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
