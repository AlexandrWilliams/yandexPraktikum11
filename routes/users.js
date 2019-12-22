const router = require('express').Router();

const {
  routerUsers, userId, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', routerUsers);
router.get('/:id', userId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
