//routes/cards.js
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  routerCards, createCard, deleteCard, cardLike, cardDisLike,
} = require('../controllers/cards');

router.get('/', routerCards);
router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required(),
    }),
}), createCard);
router.delete('/:id', celebrate({
     params: Joi.object().keys({
        id: Joi.string().alphanum().length(24),
    }),
}), deleteCard);
router.put('/:cardId/likes', celebrate({
     params: Joi.object().keys({
        id: Joi.string().alphanum().length(24),
    }),
}), cardLike);
router.delete('/:cardId/likes', celebrate({
     params: Joi.object().keys({
        id: Joi.string().alphanum().length(24),
    }),
}), cardDisLike);

module.exports = router;
