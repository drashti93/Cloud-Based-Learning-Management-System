var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');


router.get('/api/getDashboardcourses/:user_id', urlencodedParser, function(req, res){
    
    console.log("Get Dashboard API")
    console.log(req.params.user_id);
    var user_id = req.params.user_id;
    
    var getDashboardquery = "SELECT course_id, course_name, course_term from courses WHERE course_id IN (Select course_id from user_course where user_id='" + user_id+"')";
    console.log(getDashboardquery)
    pool.query(getDashboardquery, function(err, results){
        results = JSON.parse(JSON.stringify(results))
        console.log(results.length)
        if (err) {
			res.status(400);
		}	
		else {
			res.status(200).json({course_details:  results});
		}
        
    })
})

module.exports = router;