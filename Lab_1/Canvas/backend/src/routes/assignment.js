var express = require('express');
var router = express.Router();
var connection = require('../resources/database');
var multer = require('multer');
var fs = require('fs-extra');

var storage = (filePath) => {
    return multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, filePath);
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
};

router.post('/api/createAssignment/', function(req, res){
    var fileName = req.query.assignment_name+"_"+req.query.course_id+"_"+Date.now()+"."+req.query.assignment_file.split(".")[req.query.assignment_file.split(".").length-1];
    multer({
            storage: storage('public/')
        }).any('assignment_file')(req, res, function (err) {
            console.log(req.query.assignment_file, fileName);
            fs.renameSync('public/' + req.query.assignment_file,'public/' +fileName);
    });
    var setProfilequery = "Insert into assignments SET assignment_id='"+req.query.assignment_id+"',course_id='"+req.query.course_id+
        "',assignment_name ='"+req.query.assignment_name+"',assignment_file ='"+fileName+
        "',assignment_desc ='"+req.query.assignment_description+"',due='"+req.query.assignment_date+"';";

    var setFileQuery = "Insert into files (course_id,file_name,location) values ('" +req.query.course_id+ "','" +fileName+ "','/public')";     
    connection.query(setProfilequery, function(err, results){
        if (err) {
			res.status(400);
		}	
		else {
            console.log("Assingment Added")
            console.log(setFileQuery)
            connection.query(setFileQuery);
			res.status(200).json({success:true});
		}
        
    })
});

router.get('/api/downloadFile', function(req, res){
    if(req.query.assignment_file!='undefined'){
        res.download('public/'+req.query.assignment_file, req.query.assignment_file);
    } else{
        return res.status(400).send({ 
              success: false, 
              message: 'mandatory parameter missing.' 
        });         
    }
});

router.post('/api/uploadfile/', function(req, res){

    console.log(req.query)
    
    var fileName = req.query.upload_file_name+"_"+req.query.course_id+"_"+Date.now()+"."+req.query.upload_file_name.split(".")[req.query.upload_file_name.split(".").length-1];
    multer({
            storage: storage('public/')
        }).any('upload_file')(req, res, function (err) {
            //console.log(req.query.assignment_file, fileName);
            fs.renameSync('public/' + req.query.upload_file_name,'public/' +fileName);
    });
    
    var uploadquery = "Insert into files (course_id,file_name,location) values ('" +req.query.course_id+ "','" +fileName+ "','/public')";     
    connection.query(uploadquery, function(err, results){
        if (err) {
			res.status(400);
		}	
		else {
            res.status(200).json({success:true});
		}
        
    })
});

module.exports = router;