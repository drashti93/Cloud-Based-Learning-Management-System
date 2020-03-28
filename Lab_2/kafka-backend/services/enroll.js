var mongo = require('./mongoose');
// var Users = require('./models/users')
function  enroll(msg, callback){
    var res = {};
    console.log("\n---In kafka handle_request: ");
    console.log(msg)
    console.log("Enrollment body");
    console.log(msg.msg);
    var course_id = msg.msg.course_id;
    var user_id = msg.msg.user_id;
    mongo.Courses.update(
        {course_id: course_id},
        {$inc: {enrollment_count: 1}},
        function(err, results){
            if(err){
                res.sendStatus(404)
                console.log("Could not update enrollement count")
            }
            else{
                mongo.Users.update(
                    {user_id: user_id},
                    {$push: {courses: {course_id: course_id}}},
        function(err, results){
        if (err) {
			res.code = "400";
            res.value = "No courses found"
            console.log("Error in update course")
            res.sendStatus(400).end();
		}	
		else {
            res.code = "200";
            res.value = "true"
            console.log("Enrollment Added"+res)
            // res.status(200).json({success:true});
            callback(null, res);
        }
    })
        
    }
})
}

exports.enroll = enroll;