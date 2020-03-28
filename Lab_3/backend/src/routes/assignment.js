var express = require('express');
var router = express.Router();
var connection = require('../resources/database');
var multer = require('multer');
var fs = require('fs-extra');
var Users = require('../models/users');
var Courses = require('../models/courses');

var storage = (filePath) => {
    return multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, filePath);
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
};

router.post('/api/createAssignment/', function(req, res){
	var fileName = req.query.assignment_name+"_"+req.query.course_id+"_"+Date.now()+"."+req.query.assignment_file.split(".")[req.query.assignment_file.split(".").length-1];
    multer({
            storage: storage('public/')
        }).any('assignment_file')(req, res, function (err) {
            console.log(req.query.assignment_file, fileName);
            fs.renameSync('public/' + req.query.assignment_file,'public/' +fileName);
    });
    var id = parseInt(req.query.assignment_id,10);
    var course_id = parseInt(req.query.course_id,10);
    var title = req.query.assignment_name;
    var assignment_file = fileName;
    var details = req.query.assignment_description;
    var date = req.query.assignment_date;
    var grade = parseInt(req.query.assignment_grade,10);
    console.log(course_id);
    console.log(typeof course_id);
    console.log(id);
    console.log(typeof id);
    console.log(grade);
    console.log(typeof grade);
    Courses.update(
	    {
	    	"course_id": course_id
	    },
	    {
	    	$push: {assignments: {id: id, title: title, details: details, assignment_file: assignment_file, date: date}}
	    },
	    function(err, results){
	    	if(err){
	    		console.log("Error in query 1")
	    	}
	    	else{
	    		console.log("query1 executed");
	    		Users.updateMany(
	    			{
	    				"courses.course_id": course_id
	    			},
	    			{
	    				$push: {submissions: {course_id: course_id, assignment_id: id, assignment_name: title, isSubmitted: "false", from_grade: grade, stype: "assignment"}}
	    			},
	    			function(err, results){
	    				if(err){
	    					console.log("Error in query 2")
	    				}
	    				else{
	    					console.log("query2 executed");
	    					Courses.update(
	    						{
	    							"course_id": course_id
	    						},
	    						{
	    							$push: {files: {file_name: fileName, location: "/public"}}
	    						},
	    						function(err, results){
	    							if(err){
	    								res.status(404);
	    							}
	    							else{
	    								console.log("Assignment Added")
                						res.status(200).json({success:true});
	    							}
	    						}
	    					)
	    				}
	    			}
	    		)
	    	}
	    }
    )
})

router.get('/api/downloadFile', function(req, res){
    if(req.query.assignment_file!='undefined'){
        res.download('public/'+req.query.assignment_file, req.query.assignment_file);
    } else{
        return res.status(400).send({ 
              success: false, 
              message: 'mandatory parameter missing.' 
        });         
    }
});

router.post('/api/uploadfile/', function(req, res){

    console.log(req.query)
    
    var fileName = req.query.upload_file_name+"_"+req.query.course_id+"_"+Date.now()+"."+req.query.upload_file_name.split(".")[req.query.upload_file_name.split(".").length-1];
    multer({
            storage: storage('public/')
        }).any('upload_file')(req, res, function (err) {
            //console.log(req.query.assignment_file, fileName);
            fs.renameSync('public/' + req.query.upload_file_name,'public/' +fileName);
    });
    console.log(typeof req.query.flag);
    var id = parseInt(req.query.assignmentid, 10)
    var user_id = parseInt(req.query.user_id, 10);
    var course_id = parseInt(req.query.course_id, 10);
    if(req.query.flag == "yes"){
        console.log("inside if")
        Users.update({user_id: user_id, "submissions.assignment_id": id, "submissions.course_id": course_id, stype: "assignment"}, {$set: {"submissions.$.isSubmitted": "true"}}).then(() => console.log("set issubmitted"))
        Users.update({user_id: user_id, "submissions.assignment_id": id, "submissions.course_id": course_id, stype:"assignment"}, {$push: {"submissions.$.file_name": fileName, "submissions.$.location": "/public"}}, 
        function(err, results){
            if (err) {
                res.status(400);
            }	
            else {
                
                res.status(200).json({success:true});
            }
            
        })
    }
    else{
        console.log("inside else")
        Courses.update({
            course_id: course_id
        }, {$push: {files: {file_name: fileName, location: "/public"}}}, 
        function(err, results){
            if (err) {
                res.status(400);
            }	
            else {
                res.status(200).json({success:true});
            }
            
        })
    }
    
});

module.exports = router;