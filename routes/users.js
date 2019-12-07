const path = require('path');
const fs = require('fs');
const users = require('../data/users.json');

const routerUsers = (req, res) => {
      res.send(users);
};

const userId = (req, res) => {
  const {id} = req.params;

  let user = users.find(item => item._id == id);

  if (user == undefined) {
    res.send({error: `No users ${id}`});
    return
  }

  res.send(user);
}


module.exports = {
  routerUsers,
  userId
};