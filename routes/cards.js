const path = require('path');
const fs = require('fs');
const cards = require('../data/cards.json');

const routerCards = (req, res) => {
      res.send(cards);
};

module.exports = routerCards;