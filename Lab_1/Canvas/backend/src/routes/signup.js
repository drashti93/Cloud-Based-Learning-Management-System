var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var pool = require('../resources/database');



router.post('/api/signup', function(req, res){

    console.log("Inside Signup " + req.body.fullname + " " + req.body.email + " " + req.body.password + " " + req.body.user_id + " " + req.body.isStudent)
    var name = req.body.fullname;
    var email = req.body.email;
    var password = req.body.password;
    var user_id = req.body.user_id;
    var isStudent = req.body.isStudent;


    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            console.log("Hashed Password " + hash)
            var userids = "SELECT user_id from Users where user_id='"+user_id+"'";
            var loginquery = "INSERT INTO Users(user_id, name, email, password,isStudent) VALUES('" +user_id+ "','" +name+ "','" +email+ "','" +hash+"','" +isStudent+"')";

            pool.query(userids, function(err,results){

                        console.log(results);
                        if(results != ""){
                            res.sendStatus(404);              
                            console.log("User already exists");
                        }
                        else{
                            
                            pool.query(loginquery, function(err, results){
                                if(err){
                                    console.log("Query did not run");
                                    throw err;
                                }
                                else{

                                    res.sendStatus(200);
                                    console.log("Data entered successfully");
                                    
                                }
                            })
                        }
            })

        });
    });
    
    
})

module.exports = router;