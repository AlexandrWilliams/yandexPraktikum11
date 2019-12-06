const router = require('express').Router();

const {routerUsers, userId} = require('./users');
const cards = require('./cards');

router.get('/users', routerUsers);
router.get('/cards', cards);
router.get('/users/:id', userId);
router.get('/:someJunk', (req, res) => {
	const {someJunk} = req.params;
	res.send({error: `You ${someJunk} link dont work!`})
})

module.exports = router;