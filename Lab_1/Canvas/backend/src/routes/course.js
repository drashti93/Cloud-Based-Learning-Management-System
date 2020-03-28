var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');

//To get basic course detail. For home page of particular course

//For People in a particular course
router.get('/api/getCourseDetails/:course_id', urlencodedParser, function(req, res){
    
   
    let course_id = req.params.course_id
    
    var announcementQuery = "select a.idannouncements as id, u.user_id as user , u.profile_img as image, announcement_title as heading , announcement_details as content, a.date  as date from announcements a , users u where u.user_id = a.user_id and a.course_id = " + course_id;
    pool.query(announcementQuery, function(err, annoucementResults){
        console.log(annoucementResults)
        console.log("11111111")
        if (err) {
			res.status(400);
		}	
		else {
            var assignmentQuery = "SELECT assignment_id as id, assignment_name as name , due, assignment_file, assignment_desc from assignments WHERE  course_id=" + course_id;
            pool.query(assignmentQuery, function(err, assignmentResults){
                console.log("assignmentResults");
                console.log(assignmentQuery);
                console.log(assignmentResults);

                console.log("2222222")
                if (err) {
                    res.status(400);
                }   
                else {
                    var peopleQuery = "select u.user_id, name , 'Student' role , profile_img as image from users u , user_course c  where u.user_id = c.user_id and u.isStudent = 'on' and c.course_id =" +  course_id ;
                    pool.query(peopleQuery, function(err, peopleResults){
                        console.log(peopleResults)
                        console.log("333333333")
                        if (err) {
                            res.status(400);
                        }   
                        else {

                            var assignmentResultQuery = "select a.assignment_name as name , a.due , a.assignment_file, a.assignment_desc, s.grade score , s.from_grade score_from from submission s , assignments a , courses c where s.assignment_id = a.assignment_id and a.course_id = c.course_id and c.course_id = " + course_id;
                            pool.query(assignmentResultQuery, function(err, assignmentResultResults){
                                console.log("assignmentResultResults");
                                console.log(assignmentResultQuery);
                                console.log(assignmentResultResults);
                                console.log("4444444")
                                if (err) {
                                    res.status(400);
                                }
                                else{
                                    
                                    var quizQuery = "SELECT quiz_id as id, quiz_title as name , quiz_due as due, quiz_instructions as instructions from quizzes WHERE  course_id=" + course_id;
                                    pool.query(quizQuery, function(err, quizResults){
                                        console.log(quizResults)
                                        console.log("5555555")
                                    if(err){
                                        res.status(400);
                                    }
                                    else{
                                    
                                        var permQuery = "select u.user_id, name , c.permission_code, 'Student' role , profile_img as image from users u , waitlist c  where u.user_id = c.user_id and u.isStudent = 'on' and c.course_id =" +  course_id ;
                                        pool.query(permQuery, function(err, permResults){
                                            console.log(permResults)
                                            console.log("5555555")
                                        if(err){
                                            res.status(400);
                                        }
                                        else{
                                    
                                            var fileQuery = "select file_name, location from files where course_id =" +  course_id ;
                                            pool.query(fileQuery, function(err, fileResults){
                                                console.log(fileResults)
                                                console.log("8888")
                                            if(err){
                                                res.status(400);
                                            }
                                    else{
                                    console.log("Finally done")

                                    var results = {
                                        announcement : annoucementResults,
                                        peoples : peopleResults,
                                        assignment : assignmentResultResults,
                                        allAssignment : assignmentResults,
                                        allQuizzes: quizResults,
                                        waitlistedStudents: permResults,
                                        files: fileResults
                                    }
                                    console.log("Returned results ");
                                    console.log(results);
                                    res.status(200).json({course_details:  results});
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
    
    console.log("Add Course " + req.body.user_id +  req.body.course_id + req.body.course_name + req.body.course_department +  req.body.course_description +  req.body.room_number +  req.body.student_capacity + req.body.waitlist_capacity + req.body.course_term)
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    var course_name = req.body.course_name;
    var course_department = req.body.course_department;
    var course_description = req.body.course_description;
    var room_number = req.body.room_number;
    var student_capacity = req.body.student_capacity;
    var waitlist_capacity = req.body.waitlist_capacity;
    var course_term = req.body.course_term;
    var user_name = req.body.user_name;

    
    var addcoursequery = "INSERT INTO courses(user_id,course_id,course_name, course_department,course_description,room_number,student_capacity, waitlist_capacity, course_term,enrollment_count,user_name) VALUES('" +user_id+ "','" +course_id+ "','" +course_name+ "','" +course_department+"','" +course_description+"','" +room_number+"','" +student_capacity+ "','" +waitlist_capacity+ "','" +course_term+"','0','"+user_name+"')";
    var user_course_mapping = "INSERT INTO user_course(user_id,course_id) VALUES ('" +user_id+ "','" +course_id+ "')";
    
    console.log(addcoursequery)
    console.log(user_course_mapping)
    pool.query(addcoursequery, function(err, results){
        console.log("inside query")
        if (err) {
            console.log("Error");
			res.status(400);
		}	
		else {
            console.log("inserted");
            pool.query(user_course_mapping)
            console.log("inserted")
			res.status(200).json({user_name});
		}
        
    })
})



router.get('/api/getAllCourses/:user_id', urlencodedParser, function(req, res){
    
    let user_id = req.params.user_id
    console.log("Get all courses API"+user_id)
    var getAllCoursesquery = "(Select 'yes' As enrolled, u.course_id, c.course_name, c.course_department, c.course_term, c.user_name, c.student_capacity, c.waitlist_capacity, c.enrollment_count from user_course u, courses c where u.user_id='"+user_id+"' and u.course_id = c.course_id) UNION (Select 'no' as enrolled, course_id, course_name, course_department, course_term, user_name, student_capacity, waitlist_capacity, enrollment_count from courses where course_id not in (Select course_id from user_course where user_id='"+user_id+"'))"
    
    // var getAllCoursesquery = "SELECT course_id, course_name, course_department, course_term, user_name from courses";
    console.log(getAllCoursesquery)
    pool.query(getAllCoursesquery, function(err, results){
        results = JSON.parse(JSON.stringify(results))
        if (err) {
			res.status(400);
		}	
		else {
			res.status(200).json({all_courses:  results});
		}
        
    })
})



router.post('/api/enroll', urlencodedParser, function(req, res){
    
    console.log("Enroll Course " + req.body.user_id +  req.body.course_id )
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    var enrollment_count_update = "Update courses set enrollment_count = enrollment_count + 1 where course_id='"+course_id+"'";
    console.log(enrollment_count_update);
    var enrollcoursequery = "INSERT INTO user_course(user_id,course_id) VALUES('" +user_id+ "','" +course_id+ "')" ;
    console.log(enrollcoursequery)
    pool.query(enrollcoursequery, function(err, results){
        console.log("inside query")
        if (err) {
            console.log("Error");
			res.status(400);
		}	
		else {
            pool.query(enrollment_count_update);
            console.log("inserted");
			res.status(200).json({});
		}
        
    })
})

router.post('/api/waitlist', urlencodedParser, function(req, res){
    
    console.log("Waitlist Course " + req.body.user_id +  req.body.course_id )
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
   
    var waitlist_count_update = "Update courses set waitlist_capacity = waitlist_capacity - 1 where course_id='"+course_id+"'";
    var dropcoursequery = "INSERT INTO waitlist(user_id,course_id) VALUES('" +user_id+ "','" +course_id+ "')" ;
    console.log(dropcoursequery)
    pool.query(dropcoursequery, function(err, results){
        console.log("inside query")
        if (err) {
            console.log("Error");
			res.status(400);
		}	
		else {
            pool.query(waitlist_count_update);
            console.log("waitlisted");
			res.status(200).json({});
		}
        
    })
})

router.post('/api/drop', urlencodedParser, function(req, res){
    
    console.log("Drop Course " + req.body.user_id +  req.body.course_id )
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    var enrollment_count_update = "Update courses set enrollment_count = enrollment_count - 1 where course_id='"+course_id+"'";
    
    var dropcoursequery = "Delete from user_course where user_id='" +user_id+ "'and course_id='" +course_id+ "'" ;
    console.log(dropcoursequery)
    pool.query(dropcoursequery, function(err, results){
        console.log("inside query")
        if (err) {
            console.log("Error");
			res.status(400);
		}	
		else {
            pool.query(enrollment_count_update);
            console.log("dropped");
			res.status(200).json({});
		}
        
    })
})

router.post('/api/gencode', urlencodedParser, function(req, res){
    
    console.log("Generate code " + req.body.user_id +  req.body.course_id )
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    function getRandomInt() {
        return Math.floor(1000 + Math.random() * 9000);
      }
    code = getRandomInt()
    var gencodequery = "Update waitlist set permission_code = '"+code+"' where course_id='"+course_id+"' and user_id='"+user_id+"'" ;
    console.log(gencodequery)
    pool.query(gencodequery, function(err, results){
        console.log("inside query")
        if (err) {
            console.log("Error");
			res.status(400);
		}	
		else {
            console.log("code generated");
			res.status(200).json({code});
		}
        
    })
})

router.get('/api/:type/:id', urlencodedParser, function(req, res){
    
    var type = req.params.type;
    var id = req.params.id;
    if(type === "announcements"){
        var getTypeContent = "Select idannouncements as id, user_id as user_id, course_id, announcement_title as name, announcement_details as description, date as date from "+type+" where idannouncements='"+id+"'";
    }
    else if(type === "assignments"){
        var getTypeContent = "Select assignment_id as id, '' as user_id, course_id, assignment_name as name, assignment_desc as description, due as date from "+type+" where assignment_id='"+id+"'";
    }
    else if(type === "quizzes"){
        var getTypeContent = "Select quiz_id as id, '' as user_id, course_id, quiz_title as name, quiz_instructions as description, quiz_due as date from "+type+" where quiz_id='"+id+"'";
    }
    console.log(getTypeContent)
    pool.query(getTypeContent, function(err, subTabresults){
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
        
    })
})

module.exports = router;