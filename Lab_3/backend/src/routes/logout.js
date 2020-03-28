var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var session = require('express-session');



router.post('/api/logout', urlencodedParser, function(req, res){
    console.log("inside logout backend");
    console.log(req.session);
    req.session.destroy();
	console.log('Session Destroyed');
	res.status(200).send({});
})

module.exports = router;
