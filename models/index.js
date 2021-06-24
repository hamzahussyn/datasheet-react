const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/datasheet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    Student: require('./Student'),
    Course: require('./Course'),
    Grade: require('./Grade'),
    Registration: require('./Registration')
};