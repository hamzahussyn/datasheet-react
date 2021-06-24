const router = require('express').Router()
const Controller = require('../controllers');

router.get('/all', Controller.Course.getAllSemesters);
router.get('/:semno', Controller.Course.getSemesterCourses);


module.exports = router;