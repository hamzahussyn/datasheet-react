const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/students/', require('./api/student'));
app.use('/api/courses/', require('./api/course'));
app.use('/api/registrations/', require('./api/registration'));

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000/`);
})