var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var session = require('express-session');
var pool = require('../resources/database');
var bcrypt = require('bcryptjs');
var Users = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config/keys');
const jwtkey = require('../config/keys');

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
                                jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' }, (err, token) => {
                                    console.log("token" + token)
                                    var values = {
                                        token: 'JWT ' + token
                                    }
                                    // res.end(JSON.stringify(values))
                                    res.status(200).json({user_id, values}); 
                                });
                                console.log("Matched!!");
                                console.log(req.session)
                                // res.status(200).json({user_id});                                                                
                            }
                        else 
                            {
                                console.log("Wrong Password");
                                res.status(401).json({message: "wrong"});
                            }
                });
            }
        }
    )
    // passport.authenticate('local', {session: false}, (err, user, info) => {
    //     if (err || !user) {
    //         return res.status(400).json({
    //             message: 'Something is not right',
    //             user   : user
    //         });
    //     }
    //    req.login(user, {session: false}, (err) => {
    //        if (err) {
    //            res.send(err);
    //        }
    //        // generate a signed son web token with the contents of user object and return it in the response
    //        const token = jwt.sign(user, 'your_jwt_secret');
    //        return res.json({user, token});
    //     });
    // })(req, res);
})

module.exports = router;
