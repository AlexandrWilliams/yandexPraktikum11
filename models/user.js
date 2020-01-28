//models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

userSchema.path('avatar').validate((val) => {
  const urlRegex = /^(https?|ftp):\/\/(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|([a-zA-Z-_\d]{2,}(\.[a-zA-Z]{2,})+)+)(:\d{2,5})?(([a-zA-Z-/_\d]{2,})?#?)?.\w{3}$/;
  return urlRegex.test(val);
}, 'Invalid URL.');
userSchema.path('email').validate((val) => validator.isEmail(val), 'Invalid Email.');

module.exports = mongoose.model('user', userSchema);

// {"name": "syzuki",
// "about": "gsxr 750",
// "avatar": "https://upload.wikimedia.org/wikipedia/en/e/e0/USAF_F-16A_F-15C_F-15E_Desert_Storm_pic_2.jpg",
// "email": "blabla@gmail.com",
// "password": "1234567890"
// }
