// controllers/cards.js
const Card = require('../models/card');
const FourHundredError = require('../errors/four-hundred-err');

const routerCards = (req, res, next) => {
  Card.find({})
    .then((e) => {
      if (!e) {
        throw new FourHundredError('Card Not Found', 404);
      }
      res.send({ data: e });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  // console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((e) => {
      if (!e) {
        throw new FourHundredError('400 Error', 400);
      }
      res.send({ data: e });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  Card.findById(id)
    .then((e) => {
      if (!e) {
        throw new FourHundredError('404 Error', 404);
      }
      if (e.owner.equals(userId)) {
        Card.remove(e)
          .then(() => {
            res.send({ data: e, message: 'been removed' });
          })
          .catch(next);
      } else {
        throw new FourHundredError('403 Error', 403);
      }
    })
    .catch(next);
};

const cardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((e) => {
      if (e === null) {
        throw new FourHundredError('404 Error', 404);
      } else {
        res.send({ data: e });
      }
    })
    .catch(next);
};

const cardDisLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((e) => {
      if (e === null) {
        throw new FourHundredError('404 Error', 404);
      } else {
        res.send({ data: e });
      }
    })
    .catch(next);
};

module.exports = {
  routerCards,
  createCard,
  deleteCard,
  cardLike,
  cardDisLike,
};
