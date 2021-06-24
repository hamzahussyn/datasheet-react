const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
	courseid: Number,
	code: String,
	title: String,
	crhr: Number,
	semester: Number
});

module.exports = mongoose.model('Course', courseSchema);
