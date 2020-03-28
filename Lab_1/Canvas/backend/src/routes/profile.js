var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');


router.get('/api/getProfile/:user_id', urlencodedParser, function(req, res){
    
    console.log("Get Profile API")
    console.log(req.params.user_id);
    var user_id = req.params.user_id;
    
    var getProfilequery = "SELECT * from Users WHERE user_id='"+user_id+"'";
    console.log(getProfilequery)
    pool.query(getProfilequery, function(err, results){
        console.log(results[0])
        if (err) {
			res.status(400);
		}	
		else {
			res.status(200).json({user_profile:results[0]});
		}
        
    })
})

router.post('/api/setProfile/', urlencodedParser, function(req, res){
    
    //console.log("Set Profile API" + req.body.user_id +  req.body.email + req.body.phone_number + req.body.about_me +  req.body.city +  req.body.company +  req.body.school+  req.body.country+  req.body.hometown+  req.body.languages+  req.body.gender)
    console.log(req.body.phone_number)
    var user_id = req.body.user_id;

    if(req.body.phone_number==null) {
        req.body.phone_number=0;
    }
    
    var setProfilequery = "Update Users SET email='"+req.body.email+"',phone_number='"+req.body.phone_number+"',about_me='"+req.body.about_me+"',city='"+req.body.city+"',company='"+req.body.company+"',school='"+req.body.school+"',country='"+req.body.country+"',hometown='"+req.body.hometown+"',languages='"+req.body.languages+"',gender='"+req.body.gender+"' WHERE user_id='"+req.body.user_id+"'";
    console.log(setProfilequery)
    pool.query(setProfilequery, function(err, results){
        console.log("inside query")
        if (err) {
			res.status(400);
		}	
		else {
			res.status(200).json({});
		}
        
    })
})

module.exports = router;