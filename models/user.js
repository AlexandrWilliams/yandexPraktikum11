const mongoose = require('mongoose');

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
		required: true
	}
})

userSchema.path('avatar').validate((val) => {
    urlRegex = /^(https?|ftp):\/\/(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|([a-zA-Z-_\d]{2,}(\.[a-zA-Z]{2,})+)+)(:\d{2,5})?(([a-zA-Z-\/_\d]{2,})?#?)?.\w{3}$/;
    return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('user', userSchema);