const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const routerUsers = (req, res) => {
  user.find({})
    .then((e) => res.send({ data: e }))
    .catch(() => res.status(500).send({ message: '500 Error' }));
};

const userId = (req, res) => {
  const { id } = req.params;
  user.findById(id)
    .then((e) => {
      if (e === null) {
        res.status(404).send({ message: '404 Error' });
      } else {
        res.send({ data: e });
      }
    })
    .catch(() => res.status(404).send({ message: '404 Error' }));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  user.find({ email })
    .then((elem) => {
      if (elem.length === 0) {
        bcrypt.hash(password, 10)
          .then((hash) => user.create({
            name, about, avatar, email, password: hash,
          }))
          .then((e) => res.send({
            _id: e._id, name: e.name, about: e.about, avtar: e.avatar, email: e.email,
          }))
          .catch(() => res.status(500).send({ message: '500 Error' }));
      }
      res.status(456).send({ message: '456 Error' });
    })
    .catch(() => res.status(500).send({ message: '500 Error' }));
};

const updateUser = (req, res) => {
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
        res.status(404).send({ message: '404 cannot find!' });
      } else {
        res.send({ data: e, message: 'data been updated' });
      }
    })
    .catch(() => res.status(404).send({ message: '404 Error' }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((e) => res.send({ data: e, message: 'data been updated' }))
    .catch(() => res.status(500).send({ message: '500 Error' }));
};
const loginUser = (req, res) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((e) => {
      const token = jwt.sign({ _id: e._id }, 'key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ req: true });
      // .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  routerUsers,
  userId,
  loginUser,
  createUser,
  updateUser,
  updateUserAvatar,
};