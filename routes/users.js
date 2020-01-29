//routes/users.js
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  routerUsers, userId, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', routerUsers);
router.get('/:id', celebrate({
     params: Joi.object().keys({
        id: Joi.string().alphanum().length(24),
    }),
}), userId);
// router.post('/', createUser);
router.patch('/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
    }),
}), updateUser);
router.patch('/me/avatar', celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required(),
    }),
}), updateUserAvatar);

module.exports = router;
