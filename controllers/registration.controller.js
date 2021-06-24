const db = require('../models');
const Registration = require('../models/Registration');

exports.addRegistration = (req, res) => {
    //console.log(req.body);

    let courseids = JSON.parse(req.body.courseids)

    let regs = [];

    for(courseid of courseids){
        regs.push(new Registration({courseid: courseid, regno: req.body.regno, gradeid: null}));
    }
    //console.log(regs);

    db.Registration.insertMany(regs)
    .then(regs => {
        res.status(200).json(regs);    
    });    
}

exports.updateRegistration = async (req, res) => {
    console.log('Params :>> ', req.body);

    let result = await db.Registration.updateOne({ _id: req.body.id }, {
        $set: {
            gradeid: req.body.gradeid
        }
    })

    res.status(200).json(result);

}

exports.getUpdatedGPA = async (req, res) => {
    db.Registration.aggregate([
        { $match : { regno : req.params.regno, gradeid: { $ne: null } } },
        { $lookup: { from: 'courses', localField: 'courseid',  foreignField: 'courseid', as: 'course'}}, 
        { $unwind : "$course" }, 
        { $lookup: { from: 'grades', localField: 'gradeid',  foreignField: 'gradeid', as: 'grade'}},
        { $unwind: "$grade" },
        { $group: {_id: null, tcr: { $sum: "$course.crhr"}, tgpa: { $sum: { $multiply: ["$course.crhr", "$grade.gpa"]}}}},
        { $project: {_id: 0, gpa: {$divide: ["$tgpa", "$tcr"]}}}
    ])
    .then(gpa => {
        res.status(200).json(gpa[0]);    
    });      
}


exports.getRegistrationsByRegNo = (req, res) => {
    Promise.all([
        db.Registration.aggregate([
            { $match : { regno : req.params.regno } },
            { $lookup: { from: 'courses', localField: 'courseid',  foreignField: 'courseid', as: 'course'}}, 
            { $unwind : "$course" }, 
            { $lookup: { from: 'grades', localField: 'gradeid',  foreignField: 'gradeid', as: 'grade'}},
            { $unwind: { path: "$grade", preserveNullAndEmptyArrays: true } }
        ]), 
        db.Grade.find().sort({ gradeid: 1}),
        db.Registration.aggregate([
            { $match : { regno : req.params.regno, gradeid: { $ne: null } } },
            { $lookup: { from: 'courses', localField: 'courseid',  foreignField: 'courseid', as: 'course'}}, 
            { $unwind : "$course" }, 
            { $lookup: { from: 'grades', localField: 'gradeid',  foreignField: 'gradeid', as: 'grade'}},
            { $unwind: "$grade" },
            { $group: {_id: null, tcr: { $sum: "$course.crhr"}, tgpa: { $sum: { $multiply: ["$course.crhr", "$grade.gpa"]}}}},
            { $project: {_id: 0, gpa: {$divide: ["$tgpa", "$tcr"]}}}
        ])        
    ])
    .then(([regs, grades, gpa]) => {
        res.status(200).json([regs, grades, gpa[0]]);    
    });      
}