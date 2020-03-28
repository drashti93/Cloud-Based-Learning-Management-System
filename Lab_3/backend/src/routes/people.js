var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');
var Users = require('../models/users');

router.get('/api/getAllPeople', urlencodedParser, function(req, res){
    
    
    console.log("Get all people API");
    var getAllPeopleQuery = "Select user_id, name from users";
    console.log(getAllPeopleQuery)
    Users.find({}, {_id: 0, user_id: 1, name: 1}, function(err, results){
        results = JSON.parse(JSON.stringify(results))
        console.log(results);
        if (err) {
			res.status(400);
		}	
		else {
			res.status(200).json({all_people:  results});
		}
        
    })
})

module.exports = router;