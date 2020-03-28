var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var session = require('express-session');
var connection = require('../resources/database');
var bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var Users = require('../models/users');

router.post('/api/checkSession', function(req, res){
    console.log("Inside Check Session")
    // passport.use(new JWTStrategy({
    //     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //     secretOrKey   : 'your_jwt_secret'
    // }, function(jwtPayload, cb){
    //     return Users.findOneById(jwtPayload.id)
    //     .then(user => {
    //         return cb(null, user);
    //     })
    //     .catch(err => {
    //         return cb(err);
    //     });
    // }))
    console.log(req.session)
    if(req.session && req.session.user){
        
        console.log(req.session.user)
        console.log(req.session.isStudent)
        res.status(200).send({isLogged:true,user_id:req.session.user,isStudent:req.session.isStudent});
    }
    else {
        res.status(401).json({isLogged:false,user_id:''});
    }
})

module.exports = router;
