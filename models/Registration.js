const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
	courseid: Number,
	regno: String,
	gradeid: Number
});

module.exports = mongoose.model('Registration', registrationSchema);
