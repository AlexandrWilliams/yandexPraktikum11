const user = require('../models/user');

const routerUsers = (req, res) => {
  user.find({})
    .then((e) => res.send({ data: e }))
    .catch(() => res.status(500).send({ message: '500 Error' }));
};

const userId = (req, res) => {
  const { id } = req.params;
  user.findById(id)
    .then((e) => { (e === null) ? res.status(404).send({ message: '404 Error' }) : res.send({ data: e }); })
    .catch(() => res.status(404).send({ message: '404 Error' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((e) => res.send({ data: e }))
    .catch(() => res.status(500).send({ message: '500 Error' }));
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { about } = req.body;
  // res.send(req.user._id)
  user.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((e) => { (e === null) ? res.status(404).send({ message: '404 cannot find!' }) : res.send({ data: e, message: 'data been updated' }); })
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

module.exports = {
  routerUsers,
  userId,
  createUser,
  updateUser,
  updateUserAvatar,
};
