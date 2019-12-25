const card = require('../models/card');

const routerCards = (req, res) => {
  card.find({})
    .then((e) => res.send({ data: e }))
    .catch(() => res.status(500).send({ message: '500 Error' }));
};

const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((e) => res.send({ data: e }))
    .catch(() => res.status(400).send({ message: '400 Error' }));
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  card.findByIdAndRemove(id)
    .then((e) => { (e === null) ? res.status(404).send({ message: '404 Error' }) : res.send({ data: e }); })
    .catch(() => res.status(500).send({ message: '500 Error' }));
};

const cardLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((e) => { (e === null) ? res.status(404).send({ message: '404 Error' }) : res.send({ data: e }); })
    .catch(() => { res.status(500).send({ message: '500 Error' }); });
};

const cardDisLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((e) => { (e === null) ? res.status(404).send({ message: '404 Error' }) : res.send({ data: e }); })
    .catch(() => { res.status(500).send({ message: '500 Error' }); });
};

module.exports = {
  routerCards,
  createCard,
  deleteCard,
  cardLike,
  cardDisLike,
};
