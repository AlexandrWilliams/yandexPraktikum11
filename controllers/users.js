// controllers/users.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const FourHundredError = require('../errors/four-hundred-err');

const routerUsers = (req, res, next) => {
  User.find({})
    .then((e) => {
      if (!e) {
        throw new FourHundredError('404 Not Found', 404);
      }
      res.send({ data: e });
    })
    .catch(next);
};

const userId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((e) => {
      if (e === null) {
        throw new FourHundredError('404 Not Found', 404);
      } else {
        res.send({ data: e });
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.find({ email })
    .then((elem) => {
      if (elem.length > 0) {
        throw new FourHundredError('409 user with same data already been signup', 409);
      }
      if (elem.length === 0) {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name, about, avatar, email, password: hash,
          }))
          .then((e) => res.send({
            _id: e._id, name: e.name, about: e.about, avtar: e.avatar, email: e.email,
          }))
          .catch(next);
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name } = req.body;
  const { about } = req.body;
  // res.send(req.user._id);
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((e) => {
      if (e === null) {
        throw new FourHundredError('404 Error', 404);
      } else {
        res.send({ data: e, message: 'data been updated' });
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((e) => {
      res.send({ data: e, message: 'data been updated' });
    })
    .catch(next);
};
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((e) => {
      if (!e) {
        throw new FourHundredError('401 Cant find user', 401);
      }
      const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      const token = jwt.sign({ _id: e._id }, jwtKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ req: true });
      // .end();
    })
    .catch(next);
};

module.exports = {
  routerUsers,
  userId,
  loginUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
