var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');
var Users = require('../models/users');
var Courses = require('../models/courses');

router.post('/api/saveQuiz/', urlencodedParser, function(req, res){

    
    var finalObject = req.body.finalObject;
    console.log(finalObject);
    var name = req.body.name;
    var instructions = req.body.instructions;
    var date = req.body.date;
    var id = parseInt(req.body.id, 10);
    var course_id = parseInt(req.body.course_id, 10);
    
    var points = 0;
    var saveQ = "Insert into quizzes(quiz_id, quiz_title, quiz_due, quiz_instructions, course_id) values('"+id+"', '"+name+"','"+date+"', '"+instructions+"', '"+course_id+"')";
    Courses.update({
        course_id: course_id
    }, {$push: {quizzes: {id: id, title: name, date: date, details: instructions}}}, function(err, results){
        if(err){
            res.status(400)
        }
        else {
            for(var x in finalObject){
                points = points + 1;
                console.log("x->"+x)
                var question = finalObject[x][0].question;
                console.log(question)
                var answers = finalObject[x][0].answers
                var a = Object.values(answers)

                console.log(a);
                
                var ans1 = a[0];
                var ans2 = a[1];
                var ans3 = a[2];
                var ans4 = a[3];
                Courses.update({"quizzes.id": id}, {$push: {"quizzes.$.questions": {"question": question, "ans_1": ans1, "ans_2": ans2, "ans_3": ans3, "ans_4": ans4, "isRight": finalObject[x][0].isRight, "points": 1}}}).then(() => console.log("question added"))
            }
            Users.updateMany({
                "courses.course_id": course_id
            }, {$push: {submissions: {course_id: course_id, assignment_id: id, assignment_name: name, isSubmitted: "false", from_grade: points, stype: "quiz"}}}, function(err, results){
                res.status(200).json({});
            })

        }
    })
    
            
    })

router.get('/api/getQuizDetails', urlencodedParser, function(req, res){
    
    console.log("Get Quiz API")
    console.log(req.query.quiz_id);
    let quiz_id = parseInt(req.query.quiz_id, 10);
    Courses.aggregate([

        {$match: {"quizzes.id": quiz_id}},
        {$project: 
            {_id: 0, quizzes: 
                {$filter: 
                    {
                    input: "$quizzes",
                        as: "quiz",
                        cond: {$eq: ["$$quiz.id", quiz_id]}
                    }
                    }
                    }}], function(err, results){
            console.log(results[0].quizzes[0])
            if (err) {
                res.status(400);
            }	
            else {
                res.status(200).json({quiz_details:results[0].quizzes[0].questions, quizid_details: results[0].quizzes[0]});
            }
            
        })
    })
    
    

router.post('/api/submitQuiz/', urlencodedParser, function(req, res){

    
    var user_id = parseInt(req.body.user_id, 10);
    var id = parseInt(req.body.id);
    var quiz_answers = req.body.quiz_answers;
    var course_id = parseInt(req.body.course_id);
    var points = 0;
    var savePoints = "Update submission set grade = '"+points+"' where user_id='"+user_id+"' and assignment_id='"+id+"' and type='quiz'";
    console.log(quiz_answers)
    console.log("ID is");
    console.log(id);
    console.log("Course id is:")
    console.log(course_id)
    for(x in quiz_answers){
        
        if(quiz_answers[x].question){
            console.log(quiz_answers[x].question);
            console.log("x:"+ x)
            Courses.aggregate([{$match: {"quizzes.id": id}},
            {$project: 
                {_id: 0, quizzes: 
                    {$filter: 
                        {
                        input: "$quizzes",
                            as: "quiz",
                            cond: {$eq: ["$$quiz.id", id]}
                        }
                        }
                        }}],
                function(err, results){
                    if(quiz_answers[x].answer === results[0].quizzes[0].questions[x-1].isRight){
                        points++;
                    console.log("Points:"+points);
                    console.log(results[0].quizzes[0].questions[x-1].isRight)
                }
                }
            )
        }
    }
    Users.update({user_id: user_id, "submissions.assignment_id": id, "submissions.course_id": course_id, "submissions.stype": "quiz"}, {$set: {"submissions.$.isSubmitted": "true"}}).then(() => console.log("set issubmitted"))
    Users.update({user_id: user_id, "submissions.assignment_id": id, "submissions.course_id": course_id, "submissions.stype": "quiz"}, {$push: {"submissions.$.grade": points}}, function(err, results){
        if(err){
            res.status(400);
        }
        else {
            
                    res.status(200);
                
            
            
        }
    })
})

module.exports = router;