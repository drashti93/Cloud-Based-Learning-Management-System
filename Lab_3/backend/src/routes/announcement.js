var express = require('express');
var router = express.Router();
var Courses = require('../models/courses');
var Users = require('../models/users');

router.post('/api/createAnnouncement/', function(req, res){
    var moment = require('moment');
    var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(req.body.course_id)
    var id = parseInt(req.body.id);
    var course_id = parseInt(req.body.course_id);
    var title = req.body.name;
    var details = req.body.details;
    var user_id = parseInt(req.body.user_id);
    Courses.update({
        course_id: course_id
    }, {$push: {announcements: {id: id, title: title, details: details, user_id: user_id, date: timestamp}}},
        function(err, results){
        if (err) {
			res.status(400);
		}	
		else {
            console.log("Announcement Added")
			res.status(200).json({success:true});
		}
        
    })
});

module.exports = router;