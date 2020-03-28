var mongo = require('./mongoose');
// var Users = require('./models/users')
function  announcement(msg, callback){
    var res = {};
    console.log("\n---In kafka handle_request: ");
    console.log(msg)
    console.log("Announcement body");
    console.log(msg.msg);
    var timestamp = msg.msg.timestamp;
    // console.log(req.body.course_id)
    var id = msg.msg.id;
    var course_id = msg.msg.course_id;
    var title = msg.msg.title;
    var details = msg.msg.details;
    var user_id = msg.msg.user_id;
    console.log("Data");
    console.log("Timestamp "+timestamp);
    console.log("ID "+msg.msg.id)
    mongo.Courses.update({
        course_id: course_id
    }, {$push: {announcements: {id: id, title: title, details: details, user_id: user_id, date: timestamp}}},
        function(err, results){
        if (err) {
			res.code = "400";
            res.value = "No courses found"
            console.log("Error in update")
            res.sendStatus(400).end();
		}	
		else {
            res.code = "200";
            res.value = "true"
            console.log("Announcement Added"+res)
            // res.status(200).json({success:true});
            callback(null, res);
		}
        
    })
}

exports.announcement = announcement;