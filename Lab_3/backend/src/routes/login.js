var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var session = require('express-session');
var pool = require('../resources/database');
var bcrypt = require('bcryptjs');
var Users = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

router.post('/api/login', urlencodedParser, function(req, res){
    
    var password = req.body.password;
    Users.findOne(
        {
        user_id: req.body.user_id
        },
        function(err, user){
            if(err){
                console.log("User not found")
            }
            else if(user){

                var loginpass = user.password;
                var isStudent = user.isStudent;
                var user_id = user.user_id;
                console.log("Entered Pass " + password);
                console.log("Hashed Pass " + loginpass);
                bcrypt.compare(password, loginpass, function(err, check) {
                        if(check==true)
                            {
                                
                                req.session.user = req.body.user_id;
                                req.session.isStudent = isStudent;
                                console.log("Matched!!");
                                console.log(req.session)
                                res.status(200).json({user_id});                                                                
                            }
                        else 
                            {
                                console.log("Wrong Password");
                                res.sendStatus(401);
                            }
                });
            }
        }
    )
})

module.exports = router;
