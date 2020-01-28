//controllers/cards.js
const card = require('../models/card');
const fourHundredError = require('../errors/four-hundred-err');

const routerCards = (req, res, next) => {
  card.find({})
    .then((e) => {
      if(!e) {
        throw new fourHundredError('Card Not Found', 404)
      }
      res.send({ data: e })
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  // console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((e) => {
      if(!e) {
        throw new fourHundredError('400 Error', 400)
      }
      res.send({ data: e })
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  card.findById(id)
    .then((e) => {
      if(!e) {
        throw new fourHundredError('404 Error', 404)
      }
      if (e.owner.equals(userId)) {
        card.remove(e)
          .then(() => {
            res.send({ data: e, message: 'been removed' }); })
          .catch(next);
      } else {
        throw new fourHundredError('403 Error', 403);
      }
    })
    .catch(next);
};

const cardLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((e) => {
      if (e === null) {
        throw new fourHundredError('404 Error', 404);
      } else {
        res.send({ data: e });
      }
    })
    .catch(next);
};

const cardDisLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((e) => {
      if (e === null) {
        throw new fourHundredError('404 Error', 404);
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
