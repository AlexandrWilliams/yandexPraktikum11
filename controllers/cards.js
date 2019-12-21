const card = require('../models/card');
const mongoose = require('mongoose');

const routerCards = (req, res) => {
    card.find({}) 
      .then(card => res.send({ data: card }))
        .catch(() => res.status(500).send({ message: '500 Error' }));
};

const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: '500 Error' }));
};

const deleteCard = (req, res) => {
	card.findByIdAndRemove(req.params.id)
		.then(card => res.send({data: card, message: 'File been deleted'}))
			.catch(() => res.status(500).send({message: '500 Error'}))
};

const cardLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },)
};

const cardDisLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
};

module.exports = {
	routerCards,
	createCard,
	deleteCard,
  cardLike,
  cardDisLike
};