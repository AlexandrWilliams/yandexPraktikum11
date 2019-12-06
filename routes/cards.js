const path = require('path');
const fs = require('fs');
const cards = require('../data/cards.json');

const routerCards = (req, res) => {
      res.send(markupForCards(cards));
};

const cardMarkup = card =>  `
            <div>
              <p>${card.name}</p>
              <p>${card.link}</p>
              <p>${card.owner}</p>
              <p>${card._id}</p>
              <br>n     
            </div>
          `;

const markupForCards = cards => `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Cards</title>
  </head>
  <body>
      <div>
        ${cards.map(cardMarkup).join('')}
      </div>
  </body>
  </html>
`;

module.exports = routerCards;