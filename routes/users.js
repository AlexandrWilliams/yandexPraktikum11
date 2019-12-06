const path = require('path');
const fs = require('fs');
const users = require('../data/users.json');

const routerUsers = (req, res) => {
      res.send(markupForUsers(users));
};

const userMarkup = user =>  `
            <div>
              <p>${user.name}</p>
              <p>${user.about}</p>
              <p>${user.avatar}</p>
              <p>${user._id}</p>
              <br>n     
            </div>
          `;

const markupForUsers = users => `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Users</title>
  </head>
  <body>
      <div>
        ${users.map(userMarkup).join('')}
      </div>
  </body>
  </html>
`;

const userId = (req, res) => {
  const {id} = req.params;

  let user;

  users.forEach((e) => {if(e._id === id){user = e}});

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