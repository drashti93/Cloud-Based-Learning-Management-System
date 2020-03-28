11var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');
var Courses = require('../models/courses');
var Users = require('../models/users');
var kafka = require('../../kafka/client')
var topic_name = "request_topic";
//To get basic course detail. For home page of particular course

//For People in a particular course
router.get('/api/getCourseDetails/:course_id/:user_id', urlencodedParser, function(req, res){
    
    let user_id = parseInt(req.params.user_id, 10)
    console.log("Current user_id")
    console.log(user_id);
    let course_id = parseInt(req.params.course_id,10)
    console.log("Current course_id")
    console.log(course_id);
    Courses.aggregate([
        {
            $match: {course_id: course_id}
        },	
        {
            $lookup:
            {
                from: "users",
                localField: "announcements.user_id",
                foreignField: "user_id",
                as: "announcement_details"
            }
        },
        {
            $project:
            {
                _id: 0,
                announcements: 1,
                announcement_details: {user_id: 1, name: 1}
            }
        },
        {
            $unwind: "$announcements"
        }
    ], function(err, annoucementResults){
        console.log("Announcements: ")
        // console.log(annoucementResults);
        var an = [];
        for(x in annoucementResults){
            // console.log(annoucementResults[0].announcements[x]);
            an.push(annoucementResults[0])
        }
        if (err) {
			res.status(400);
		}	
		else {
            Courses.find({
                course_id: course_id
            }, {
                _id: 0,
                assignments: 1
            }, function(err, assignmentResults){
                console.log("Assignments: "+ assignmentResults)
                if (err) {
                    res.status(400);
                }   
                else {
                    Users.find({
                        "$and": 
                        [
                        {"courses.course_id": course_id},
                        {"isStudent": "on"},
                        ]
                    }, {
                        _id: 0,
                        user_id: 1,
                        name: 1,
                    }, function(err, peopleResults){
                        console.log("People: "+ peopleResults)
                        if (err) {
                            res.status(400);
                        }   
                        else {
                            
                            Users.aggregate([
                                {$match:
                                    {user_id: user_id, "submissions.course_id": course_id}
                                }, {$project: 
                                    {_id: 0, submissions: 
                                        {$filter: 
                                            {input: "$submissions", as: "submission", cond: {$eq: ["$$submission.course_id", course_id]}}
                                         }
                                    }
                                   }
                            ], function(err, assignmentResultResults){
                                if (err) {
                                    res.status(400);
                                }
                                else{
                                    
                                    
                                    Courses.find(
                                        {course_id: course_id},
                                        {_id: 0, quizzes: 1},
                                        function(err, quizResults){
                                            console.log("Quizzes : "+ quizResults)
                                        if(err){
                                            res.status(400);
                                        }
                                        else{
					console.log(course_id);
					console.log(typeof course_id);
                                        Courses.aggregate([
                                            {$match: {course_id: course_id}},
                                            {
                                                $lookup: 
                                                {
                                                    from: "users",
                                                    localField: "waitlist.user_id",
                                                    foreignField: "user_id",
                                                    as: "user_details"
                                                }
                                            },
                                            {$project: {_id: 0, user_details:{user_id: 1, name: 1, permission_code: 1}, waitlist: 1}}
                                        ], function(err, permResults){
					    if(err){
						console.log("error"+err);
					    }
                                            console.log("Permissions: ");
					    console.log(permResults);
                                            console.log(permResults[0].user_details[0]);
                                            console.log(permResults[0].waitlist[0])
                                            var p = [], q=[];
                                            for(x in permResults){
                                                if(permResults[x].user_details[0]){
                                                console.log(permResults[x].user_details[0]);
                                                console.log(permResults[0].waitlist[0]);
                                                p.push(permResults[x].user_details[0]);
                                                q.push(permResults[x].waitlist[0]);
                                                }
                                            }
                                            if(err){
                                                res.status(400);
                                            }
                                            else{
                                            Courses.find({
                                                course_id: course_id
                                            }, {_id: 0, "files.file_name": 1, "files.location": 1}, function(err, fileResults){
                                                console.log("Files: "+ fileResults)
                                            if(err){
                                                res.status(400);
                                            }
                                            else{
                                                Users.aggregate([
                                                    {$match: {"courses.course_id": 273}}, 
                                                    {$project: {_id: 0, user_id: 1, name: 1, submissions: 
                                                        {$filter: 
                                                            {input: "$submissions", 
                                                                as: "submission", 
                                                                cond: {$eq: 
                                                                    ["$$submission.assignment_id", 3]
                                                                    }
                                                             }
                                                        }
                                                    }
                                                    }], function(err, submissionResults){
                                                console.log("Submissions"+submissionResults)
                                                // var s = [];
                                                // for(x in submissionResults){
                                                //     console.log("x: - > "+x);
                                                //     console.log(submissionResults[x]);
                                                //     // console.log(submissionResults[x].submissions[0]);
                                                //     if(submissionResults[x].submissions.length != 0){
                                                //         if(submissionResults[x].submissions[0].isSubmitted === "true"){
                                                //             if(submissionResults[x].submissions[0].stype === "assignment"){
                                                //                 s.push(submissionResults[x]);
                                                //             }
                                                //         }
                                                //     }
                                                // }
                                                // console.log(s);
                                                if(err){
                                                    res.status(400);
                                                }
                                    else{
                                    console.log("Finally done")

                                    var results = {
                                        announcement : an,
                                        peoples : peopleResults,
                                        assignment : (assignmentResultResults && assignmentResultResults[0] && assignmentResultResults[0].submissions) ? assignmentResultResults[0].submissions : "",
                                        allAssignment : assignmentResults,
                                        allQuizzes: quizResults,
                                        waitlistedStudents: p,
                                        waitlistedStudentsCode: q,
                                        files: fileResults,
                                        submissions: submissionResults
                                    }
                                //    console.log("Returned results ");
                                    console.log(results);
                                    res.status(200).json({course_details:  results});
                                    //console.log(req.session);
                                }

                            })

                            

                        }

                            })

                        }
                                
                            })
                        }
                    })
                    }
                
                            })
                        }
                        
                    })
                    
                }
                
            })
        }
        
    })

})



router.post('/api/addCourse', urlencodedParser, function(req, res){
    
        
Courses.findOne(
	{
		course_id: parseInt(req.body.course_id,10)
	},
	function(err, course){
		if(err){
			console.log("Find course query did not run")
		}
		else if(course) {
			console.log("Course with this id already exists")
		}
		else if(!course) {
			console.log("Adding new course");
			var new_course = new Courses({
				user_id : req.body.user_id,
			    	course_id : req.body.course_id,
			    	course_name : req.body.course_name,
			    	course_department : req.body.course_department,
			    	course_description : req.body.course_description,
			    	room_number : req.body.room_number,
			    	student_capacity : req.body.student_capacity,
			    	waitlist_capacity : req.body.waitlist_capacity,
                		course_term : req.body.course_term,
                		user_name: req.body.user_name,
				enrollment_count: 0,
			})
			new_course.save().then((course) => {
				console.log("Course added successfully");
				Users.updateOne(
					{
						user_id: req.body.user_id
					},
					{
						$push: 	{
									courses: 
										{
											course_id: req.body.course_id
										}
								}
					}
				).then(() => {
					console.log("User course mapped successfully")
				}), (err) => {
					console.log("User course mapping unsuccessfull")
				}
			}), (err) => {
					console.log("Could not add course")
			}
		}
	}
)
})



router.get('/api/getAllCourses/:user_id', urlencodedParser, function(req, res){
    
    let user_id = parseInt(req.params.user_id, 10)
    console.log("Get all courses API"+user_id+typeof(user_id))
    var q1;
    var q2 = [];
    var q3 = [];
    var q4 = [];
    Users.find({user_id: user_id}, {_id: 0, "courses.course_id": 1}, (function(err,results){
            q1 = results[0].courses
            for(x in q1){
                if(x < q1.length){
                    q2.push(q1[x].course_id)
                }
            }
            console.log(q2);
    })).then((q2) => {
        console.log(q2[0])
        q1 = q2[0].courses
        for(x in q1){
            if(x < q1.length){
                q3.push(q1[x].course_id)
            }
        }
        console.log(q3);
        Courses.aggregate(
        [{$match: {course_id: {$nin: q3}}},
        {$addFields: {enrolled: "no"}}],
        function(err, results){
            for(x in results){
                q4.push(results[x])
            }
        console.log(q4)
        Users.aggregate([
            {
                $match: {user_id: user_id}
            }, 
            {
                $lookup: {
                    from: "courses", 
                    localField: "courses.course_id", 
                    foreignField: "course_id", 
                    as: "course_details"
                }
            },
            {
                $unwind: "$course_details"
            },
            {
                $project: {
                    _id: 0, 
                    "course_details": 1
                }
            },
            {
                $addFields: {"course_details.enrolled": "yes"}
            }
            ], function(err, results1){
                console.log(results1)
                for(x in results1){
                    q4.push(results1[x].course_details)
                }
                console.log(q4);
                if (err) {
                    res.status(400);
                }	
                else {
                    res.status(200).json({all_courses:  q4});
                }
            })
        })})
})



router.post('/api/enroll', urlencodedParser, function(req, res){
    var msg = {user_id: parseInt(req.body.user_id, 10), course_id: parseInt(req.body.course_id)}
    console.log("Enroll Course " + req.body.user_id +  req.body.course_id )
    // Courses.update(
    //     {course_id: req.body.course_id},
    //     {$inc: {enrollment_count: 1}},
    //     function(err, results){
    //         if(err){
    //             res.sendStatus(404)
    //             console.log("Could not update enrollement count")
    //         }
    //         else{
    //             Users.update(
    //                 {user_id: req.body.user_id},
    //                 {$push: {courses: {course_id: req.body.course_id}}}, 
    //                 function(err, results1){
    //                     if (err) {
    //                         console.log("Could not update user with course");
    //                         res.status(400);
    //                     }	
    //                     else {
    //                         console.log("Course added to user");
    //                         res.status(200).json({});
    //                     }
    //             })
    //         }
    //     }
    // )
    kafka.make_request(topic_name, 'enroll', {msg}, function(err,results){
        console.log('\n---- Inside Node for enroll ----');
        // console.log("results  :" + results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{  
            console.log("\nMessage history from Node backend : ",results);
            res.end(JSON.stringify(results));
     }
    })
})

router.post('/api/waitlist', urlencodedParser, function(req, res){
    
    console.log("Waitlist Course " + req.body.user_id +  req.body.course_id )
    Courses.update(
        {course_id: parseInt(req.body.course_id,10)},
        {$inc: {waitlist_capacity: 1}},
        function(err, results){
            if(err){
                res.sendStatus(404)
                console.log("Could not update waitlist count")
            }
            else{
                Courses.update({course_id: parseInt(req.body.course_id,10)},
                    {$push: {waitlist: {user_id: parseInt(req.body.user_id,10)}}}, 
                    function(err, results1){
                        if (err) {
                            console.log("Could not update user with course");
                            res.status(400);
                        }	
                        else {
                            console.log("Course added to user");
                            res.status(200).json({});
                        }
                })
            }
        }
    )
})

router.post('/api/drop', urlencodedParser, function(req, res){
    
    console.log("Drop Course " + req.body.user_id +  req.body.course_id )
    var user_id = parseInt(req.body.user_id, 10);
    var course_id = parseInt(req.body.course_id, 10);
    var msg = {user_id: user_id, course_id: course_id}
    // Courses.update(
    //     {course_id: req.body.course_id},
    //     {$inc: {enrollment_count: -1}},
    //     function(err, results){
    //         if(err){
    //             res.sendStatus(404)
    //             console.log(err);
    //             console.log("Could not update enrollment count")
    //         }
    //         else{
    //             Users.update(
    //                 {user_id: req.body.user_id},
    //                 {$pull: {courses: {course_id: req.body.course_id}}}, 
    //                 function(err, results1){
    //                     if (err) {
    //                         console.log("Could not update user with course");
    //                         res.status(400);
    //                     }	
    //                     else {
    //                         console.log("Course added to user");
    //                         res.status(200).json({});
    //                     }
    //             })
    //         }
    //     }
    // )
    kafka.make_request(topic_name, 'drop', {msg}, function(err,results){
        console.log('\n---- Inside Node for drop ----');
        // console.log("results  :" + results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{  
            console.log("\nMessage history from Node backend : ",results);
            res.end(JSON.stringify(results));
     }
    })
})

router.post('/api/gencode', urlencodedParser, function(req, res){
    
    console.log("Generate code " + req.body.user_id +  req.body.course_id )
    var user_id = parseInt(req.body.user_id, 10);
    var course_id = parseInt(req.body.course_id,10);
    function getRandomInt() {
        return Math.floor(1000 + Math.random() * 9000);
      }
    code = getRandomInt()
    Courses.update({
        course_id: parseInt(req.body.course_id, 10), "waitlist.user_id": parseInt(req.body.user_id, 10)
    }, {$push: {"waitlist.$.permission_code": code}}, function(err, results){
        if (err) {
            console.log("Error in generating code");
			res.status(400);
		}	
		else {
            console.log("code generated");
	    console.log(code);
			res.status(200).json({code});
		}
    })
})

router.get('/api/:type/:id/:course_id', urlencodedParser, function(req, res){
    
    var xtype = req.params.type;
    var id = parseInt(req.params.id, 10);
    var course_id = parseInt(req.params.course_id, 10);
    console.log(xtype)
    if(xtype === "announcements"){
        Courses.aggregate([

            {$match: {"announcements.id": id}},
            {$project: 
                {_id: 0, announcements: 
                    {$filter: 
                        {
                        input: "$announcements",
                            as: "announcement",
                            cond: {$eq: ["$$announcement.id", id]}
                        }
                        }
                        }}], function(err, subTabresults){
            console.log("inside query")
            if (err) {
                console.log("Error");
			    res.status(400);
		    }	
            else {
                console.log("get content");
                console.log(subTabresults);
                res.status(200).json({component_details: subTabresults});
            }
        })
    }
    else if(xtype === "assignments"){
        Courses.aggregate([

            {$match: {"assignments.id": id}},
            {$project: 
                {_id: 0, assignments: 
                    {$filter: 
                        {
                        input: "$assignments",
                            as: "assignment",
                            cond: {$eq: ["$$assignment.id", id]}
                        }
                        }
                        }}], function(err, subTabresults){
            console.log("inside query")
            if (err) {
                console.log("Error");
			    res.status(400);
		    }	
            else {
                Users.aggregate([
                    {$match: {"courses.course_id": course_id}}, 
                    {$project: {_id: 0, user_id: 1, name: 1, submissions: 
                        {$filter: 
                            {input: "$submissions", 
                                as: "submission", 
                                cond: {$eq: 
                                    ["$$submission.assignment_id", id]
                                    }
                             }
                        }
                    }
                    }], function(err, submissionResults){
                console.log("Submissions"+submissionResults)
                var s = [];
                for(x in submissionResults){
                    console.log("x: - > "+x);
                    console.log(submissionResults[x]);
                    // console.log(submissionResults[x].submissions[0]);
                    if(submissionResults[x] !== undefined && submissionResults[x].submissions != null && submissionResults[x].submissions.length != 0){
                        if(submissionResults[x].submissions[0].isSubmitted === "true"){
                            if(submissionResults[x].submissions[0].stype === "assignment"){
                                s.push(submissionResults[x]);
                            }
                        }
                    }
                }
                console.log(s);
                console.log("get content");
                console.log(subTabresults[0]);
                res.status(200).json({component_details: subTabresults[0], assignment_submissions: s});
            })
                
            }
        })    }
    else if(xtype === "quizzes"){
        Courses.aggregate([

            {$match: {"quizzes.id": id}},
            {$project: 
                {_id: 0, quizzes: 
                    {$filter: 
                        {
                        input: "$quizzes",
                            as: "quiz",
                            cond: {$eq: ["$$quiz.id", id]}
                        }
                        }
                        }}], function(err, subTabresults){
            console.log("inside query")
            if (err) {
                console.log("Error");
			    res.status(400);
		    }	
            else {
                console.log("get content");
                console.log(subTabresults);
                res.status(200).json({component_details: subTabresults[0]});
            }
        })    }
})

router.get('/api/getCode/:code/:user_id/:course_id', urlencodedParser, function(req, res){
    
    var user_id = parseInt(req.params.user_id, 10);
    var course_id = parseInt(req.params.course_id, 10);
    var code = parseInt(req.params.code, 10);
    Courses.findOne({
        $and: [
        {course_id: course_id},
        {"waitlist.user_id": user_id}]
    }, {_id:0, "waitlist.permission_code": 1}, function(err, results){
        console.log(results.waitlist[0].permission_code);
    if(results.waitlist[0].permission_code === code){
    Courses.update(
        {course_id: course_id},
        {$inc: {enrollment_count: 1}},
        function(err, results){
            if(err){
                res.sendStatus(404)
                console.log("Could not update enrollement count")
            }
            else{
                Users.update(
                    {user_id: user_id},
                    {$push: {courses: {course_id: course_id}}}, 
                    function(err, results1){
                        if (err) {
                            console.log("Could not update user with course");
                            res.status(400);
                        }	
                        else {
                            console.log("Course added to user");
                            res.status(200).json({});
                        }
                })
            }
        }
    )
    }
})
    console.log("Get code"+user_id+course_id+code)   
})

router.post('/api/submitGrades', urlencodedParser, function(req, res){
    
    console.log("Generate code " + req.body.grade +  req.body.submission_id )
    var grade = parseInt(req.body.grade, 10);
    var submission_id = req.body.submission_id;
    console.log(submission_id)
    Users.update({"submissions._id": submission_id}, {$push: {"submissions.$.grade": grade}}, function(err, results){
        if (err) {
            console.log("Error in submitting grade");
			res.status(400);
		}	
		else {
            console.log("grade submitted");
			res.status(200).json({success: true});
		}
    })
})

module.exports = router;
