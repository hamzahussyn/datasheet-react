const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	regno: String,
	studentname: String,
	fathername: String
});

module.exports = mongoose.model('Student', studentSchema);
