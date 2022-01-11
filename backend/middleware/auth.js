const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { JWT_SECRET } = process.env;

dotenv.config();
const handleAuthError = (res) => {
  res
    .status(403)
    .send({ message: 'Authorization Error' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  console.log(token)
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  return next(); // passing the request further along
};
