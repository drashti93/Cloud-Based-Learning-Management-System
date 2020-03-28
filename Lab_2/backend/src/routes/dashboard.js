var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');
var topic_name = "request_topic";

var kafka = require('../../kafka/client')

//module.exports.dashboard = function(req,res){
router.get('/api/getDashboardcourses/:user_id', urlencodedParser, function(req, res){  
    var user_id = parseInt(req.params.user_id, 10);
    console.log("inside dashboard kafka request"+user_id)
    kafka.make_request(topic_name,'dashboard', {user_id}, function(err,results){
        console.log('\n---- Inside Node get dashboard ----');
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

// router.get('/api/getDashboardcourses/:user_id', urlencodedParser, function(req, res){
    
//     console.log("Get Dashboard API")
//     console.log(req.params.user_id);
//     var user_id = parseInt(req.params.user_id, 10);
  //   Users.aggregate([
  //       {
  //           $lookup:
  //           {
  //               from: "courses",
  //               localField: "courses.course_id",
  //               foreignField: "course_id",
  //               as: "course_details"
  //           }
  //       },
  //       {
  //           $match: {user_id: user_id}
  //       },
  //       {
  //           $project: {_id: 0, "course_details.course_id": 1, "course_details.course_name":1}
  //       }
  //       ], function(err, results){
  //       console.log("dashboard results");
  //       console.log(results[0].course_details);
  //       // console.log("dashboard length");
  //       // console.log(results.length)
  //       if (err) {
		// 	res.status(400);
		// }	
		// else {
		// 	res.status(200).json({course_details:  results[0].course_details});
		// }
        
  //   })
// })

module.exports = router;