// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { loginUser, createUser } = require('./controllers/users');
//celebrate and joi
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
//winston blue
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;//3000
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }),
}), createUser);
app.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }).unknown(true),
}), loginUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

//errors
//winston err logger
app.use(errorLogger);
app.use(errors()); // celebrate
app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({message: statusCode === 500? 'На сервере произошла ошибка': message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
