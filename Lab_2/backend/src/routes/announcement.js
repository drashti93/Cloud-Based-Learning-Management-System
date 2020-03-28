var express = require('express');
var router = express.Router();
var Courses = require('../models/courses');
var Users = require('../models/users');
var kafka = require('../../kafka/client')
var topic_name = "request_topic";
router.post('/api/createAnnouncement/', function(req, res){
    var moment = require('moment');
    // var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // console.log(req.body.course_id)
    // var id = parseInt(req.body.id);
    // var course_id = parseInt(req.body.course_id);
    // var title = req.body.name;
    // var details = req.body.details;
    // var user_id = parseInt(req.body.user_id);
    // Courses.update({
    //     course_id: course_id
    // }, {$push: {announcements: {id: id, title: title, details: details, user_id: user_id, date: timestamp}}},
    //     function(err, results){
    //     if (err) {
	// 		res.status(400);
	// 	}	
	// 	else {
    //         console.log("Announcement Added")
	// 		res.status(200).json({success:true});
	// 	}
        
    // })
    var msg =   {
                    timestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    id: parseInt(req.body.id),
                    course_id: parseInt(req.body.course_id),
                    title: req.body.name,
                    details: req.body.details,
                    user_id: parseInt(req.body.user_id)
                }
    kafka.make_request(topic_name, 'announcement', {msg}, function(err,results){
        console.log('\n---- Inside Node for announcement ----');
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
});



module.exports = router;