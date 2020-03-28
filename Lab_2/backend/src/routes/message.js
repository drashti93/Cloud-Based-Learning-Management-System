var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var pool = require('../resources/database');
var Users = require('../models/users');


router.get('/api/getAllMessages', urlencodedParser, function(req, res){
    console.log("in get");
    
    let user_id = parseInt(req.query.user_id, 10)
    console.log("Get all messages API"+user_id)
    Users.find({
        user_id: user_id
    }, {_id: 0, messages: 1}, function(err, results){    
        console.log(results[0].messages)
        if (err) {
			res.status(400);
		}	
		else {
            res.status(200).json({all_messages:  results[0].messages});
		}
        
    })
})

router.post('/api/sendMessage/', urlencodedParser, function(req, res){
    var moment = require('moment');
    var timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var sender_user_id = parseInt(req.body.sender_user_id,10);
    var receiver_user_id = parseInt(req.body.receiver_user_id,10);
    var message_body = req.body.message_body;
    Users.find({
        user_id: sender_user_id
    }, {name: 1}, function(err, results1){
        if(err){
            res.sendStatus(404);
        }
        else{
            Users.find({
                user_id: receiver_user_id
            }, {name: 1}, function(err, results2){
                if(err){
                    res.sendStatus(404);
                }
                else{
                    console.log(results1[0].name);
                    console.log(results2[0].name);
                    Users.update({
                        user_id: sender_user_id
                    }, {$push: {messages: {toid: receiver_user_id, toName: results2[0].name, fromid: sender_user_id, fromName: results1[0].name, message: message_body, timeStamp: timestamp}}}, function(err, results){
                        if(err){
                            res.status(404);
                        }
                        else{
                            Users.update({
                                user_id: receiver_user_id
                            }, {$push: {messages: {fromid: sender_user_id, fromName: results1[0].name, toid: receiver_user_id, toName: results2[0].name, message: message_body, timeStamp: timestamp}}}, function(err, results){
                            if(err){
                                res.sendStatus(404);
                            }
                            else{
                                res.status(200);
                            }
                        })
                    }
                })
            }
        })
    }
    })
    
})

module.exports = router;