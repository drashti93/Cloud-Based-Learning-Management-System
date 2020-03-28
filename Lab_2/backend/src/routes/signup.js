var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Users = require('../models/users');


router.post('/api/signup', function(req, res){
    console.log("Inside Signup " + req.body.fullname + " " + req.body.email + " " + req.body.password + " " + req.body.user_id + " " + req.body.isStudent)
    var password = req.body.password;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            console.log("Hashed Password " + hash)
            Users.findOne(
                {
                    user_id: req.body.user_id
                },
                function(err, user){
                    if(err){
                        console.log("Find user query did not run");
                        res.sendStatus(404);
                    }
                    else if(user){
                        console.log("User already exists");
                        res.status(404).json({message: 'wrong'});
                    }
                    else if(!user){
                        console.log("Adding new user");
                        var new_user = new Users({
                            name : req.body.fullname,
                            email : req.body.email,
                            password : hash,
                            user_id : req.body.user_id,
                            isStudent : req.body.isStudent,
                        })
                        new_user.save().then((user) => {
                            console.log("Data entered successfully")
                            res.status(200).json({message: 'right'});
                        }), (err) => {
                            res.sendStatus(404);
                            console.log("Error entering data in database");
                        }
                    }
                }
            )

        });
    });  
})

module.exports = router;
