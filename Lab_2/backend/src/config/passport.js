// const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
// var bcrypt = require('bcryptjs');
// var Users = require('../models/users');
// var jwt = require('jsonwebtoken');

// passport.use(new LocalStrategy({
//     userId: 'user_id',
//     password: 'password'
// }, function(user_id, password, cb){
//     return Users.findOne({user_id: user_id},
//         function(err, results){
//             if(err){
//                 return cb(null, false, {message: 'User not found'});
//             }
//             else if(user){
//                 var loginpass = user.password;
//                 var isStudent = user.isStudent;
//                 var user_id = user.user_id;
//                 console.log("Entered Pass " + password);
//                 console.log("Hashed Pass " + loginpass);
//                 bcrypt.compare(password, loginpass, function(err, check) {
//                         if(check==true)
//                             {
                                
//                                 req.session.user = req.body.user_id;
//                                 req.session.isStudent = isStudent;
//                                 console.log("Matched!!");
//                                 // console.log(req.session)
//                                 // res.status(200).json({user_id});
//                                 return cb(null, user, {message: 'Logged In Successfully'});                                                                
//                             }
//                         else 
//                             {
//                                 // console.log("Wrong Password");
//                                 // res.sendStatus(401);
//                                 return cb(null, false, {message: 'Wrong password'})
//                             }
//                 });
//             }
//         })
// }
// ));

'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('../resources/mongoose');
var config = require('./keys');
var Users = require('../models/users');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        Users.find({user_id: jwt_payload.user_id}, function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};
