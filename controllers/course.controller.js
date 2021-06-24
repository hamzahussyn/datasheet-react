const db = require('../models');

exports.getAllSemesters = (req, res) => {
    db.Course.distinct('semester')
    .then(semsters => res.status(200).json(semsters));    
}

exports.getSemesterCourses = (req, res) => {
    db.Course.find({ semester: req.params.semno }).sort({ courseid: 1 })
    .then(semsters => res.status(200).json(semsters));    
}