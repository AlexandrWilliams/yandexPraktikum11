const user = require('../models/user');

const routerUsers = (req, res) => {
    user.find({}) 
      .then(user => res.send({ data: user }))
        .catch(() => res.status(500).send({ message: '500 Error' }));
};

const userId = (req, res) => {
  const {id} =  req.params;
  user.findById(id) 
    .then(user => res.send({ data: user }))
      .catch(() => res.status(404).send({ message: '404 Error' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: '500 Error' }));
};

const updateUser = (req, res) => {
  const name = req.body.name;
  const about = req.body.about;
  //res.send(req.user._id)
  user.findByIdAndUpdate(req.user._id,
   {name: name, about: about},
   {
        new: true,
        runValidators: true
    }
   )
    .then(user => res.send({data: user, message: 'data been updated'}))
      .catch(() => res.status(404).send({ message: '500 Error' }));
};

const updateUserAvatar = (req, res) => {
  const avatar = req.body.avatar;
  user.findByIdAndUpdate(req.user._id,
    {avatar: avatar},
    {
        new: true,
        runValidators: true
    }
  )
    .then(user => res.send({data: user, message: 'data been updated'}))
      .catch(() => res.status(500).send({ message: '500 Error' }));
};

module.exports = {
  routerUsers,
  userId,
  createUser,
  updateUser,
  updateUserAvatar
};