//middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // console.log(req.cookies.jwt);
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;

  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
