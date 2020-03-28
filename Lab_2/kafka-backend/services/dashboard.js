var mongo = require('./mongoose.js');
// var Users = require('./models/users')
function  dashboard(msg, callback){
    var res = {};
    console.log("\n---In kafka handle_request for dashboard: "+ msg);

    mongo.Users.aggregate([
        {
            $lookup:
            {
                from: "courses",
                localField: "courses.course_id",
                foreignField: "course_id",
                as: "course_details"
            }
        },
        {
            $match: {user_id: msg.user_id}
        },
        {
            $project: {_id: 0, "course_details.course_id": 1, "course_details.course_name":1}
        }
        ], function(err, results){
        console.log("dashboard results");
        console.log(results[0].course_details);
        // console.log("dashboard length");
        // console.log(results.length)
        if (err) {
            res.code = "400";
            res.value = "No courses found"
            res.sendStatus(400).end();
        }   
        else {
            res.code = "200";
            res.value = results[0].course_details;
            course_details = results[0].course_details;
            console.log("Response from kafka handle_request for dashboard" + JSON.stringify(res));
            console.log(res);
            // res.status(200).json({course_details:  results[0].course_details});
            callback(null, res);
        }
        
    })
   
                        
                        
    }  
    exports.dashboard = dashboard;
