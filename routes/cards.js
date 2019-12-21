const router = require('express').Router();

const {routerCards, createCard, deleteCard, cardLike, cardDisLike} = require('../controllers/cards');

router.get('/', routerCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:cardId/likes', cardLike);
router.delete('/:cardId/likes', cardDisLike);

module.exports = router;