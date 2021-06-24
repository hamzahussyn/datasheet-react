const router = require('express').Router()
const Controller = require('../controllers');

router.get('/:regno', Controller.Student.getStudentByRegNo);


module.exports = router;