//controllers/users.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const fourHundredError = require('../errors/four-hundred-err');

const routerUsers = (req, res, next) => {
  user.find({})
    .then((e) => {
      if(!e) {
        throw new fourHundredError('404 Not Found', 404);
      }
      res.send({ data: e })})
    .catch(next);
};

const userId = (req, res, next) => {
  const { id } = req.params;
  user.findById(id)
    .then((e) => {
      if (e === null) {
        throw new fourHundredError('404 Not Found', 404);
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
  user.find({ email })
    .then((elem) => {
      if(elem) {
        throw new fourHundredError('409 Error', 409);
      }
      if (elem.length === 0) {
        bcrypt.hash(password, 10)
          .then((hash) => user.create({
            name, about, avatar, email, password: hash,
          }))
          .then((e) => res.send({
            _id: e._id, name: e.name, about: e.about, avtar: e.avatar, email: e.email,
          }))
          .catch(next);
        return;
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name } = req.body;
  const { about } = req.body;
  // res.send(req.user._id);
  user.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((e) => {
      if (e === null) {
        throw new fourHundredError('404 Error', 404);
      } else {
        res.send({ data: e, message: 'data been updated' });
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((e) => {
      res.send({ data: e, message: 'data been updated' })
    })
    .catch(next);
};
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return user.findUserByCredentials(email, password)
    .then((e) => {
      if (!e) {
        throw new fourHundredError('401 Error', 401);
      }
      const token = jwt.sign({ _id: e._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
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
