const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.post(bodyParser.urlencoded({ extended: false }));
app.post(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: `Route ${req.url} Not found.` });
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error.' });
  next();
});

app.listen(PORT, () => {
  console.log(`Link to the server ${PORT}`);
  console.log(BASE_PATH);
});
