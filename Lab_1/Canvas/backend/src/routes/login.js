var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var session = require('express-session');
var pool = require('../resources/database');
var bcrypt = require('bcryptjs');


router.post('/api/login', urlencodedParser, function(req, res){
    
    
    var user_id = req.body.user_id;
    var password = req.body.password;
    var loginpass;
    var loginquery = "SELECT * from Users WHERE user_id='"+user_id+"'";
    pool.query(loginquery, function(err, results){
        if(results != ""){
            if(err){
                throw err;
            }
            if(results.length) {

                loginpass = results[0].password;
                var isStudent = results[0].isStudent;
                
                console.log("Entered Pass " + password)
                console.log("Hashed Pass " + loginpass)


                bcrypt.compare(password, loginpass, function(err, check) {
                    // res == true
                    
                    if(check==true)
                        {
                            req.session.user = user_id;
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
        else{
            console.log("Please enter correct values");
            res.sendStatus(404);
        }
        }
        else{
            console.log("Invalid username/password");
            res.sendStatus(404);
        }
    })
})

module.exports = router;
