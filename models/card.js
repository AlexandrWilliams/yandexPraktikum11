const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.path('link').validate((val) => {
  const urlRegex = /^(http(s?):|ftp:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/g;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('Card', cardSchema);
// ^(https?|ftp):\/\/(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|([a-zA-Z-_\d]{2,}(\.[a-zA-Z]{2,})+)+)
// (:\d{2,5})?(([a-zA-Z-/_\d]{2,})?#?)?.\w{3}$
