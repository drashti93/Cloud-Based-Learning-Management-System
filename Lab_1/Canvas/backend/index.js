var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var login = require('./src/routes/login');
var checkSession = require('./src/routes/checkSession');
var signup = require('./src/routes/signup');
var profile = require('./src/routes/profile');
var dashboard = require('./src/routes/dashboard');
var course = require('./src/routes/course');
var logout = require('./src/routes/logout');
var MySQLStore = require('express-mysql-session')(session);
var assignment = require('./src/routes/assignment');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/static',express.static(__dirname + 'public'));

var config = {
  
  server: 'localhost',
  port : '3306',
  user: 'root',
  password: 'Root@123',
  database: 'Canvas_Lab1'
}


var sessionStore = new MySQLStore(config);


app.use(session({
  secret: "Iamsupersecretsecret",
  resave: false,
  saveUninitialized: false,
  duration: 600000000000 * 60 * 1000,
  activeDuration: 6 * 60 * 60 * 1000,
   cookie : {
        maxAge: 1000* 60 * 60 *24 * 365,
        expires : 3600000 * 24 * 60
},
store: sessionStore
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static('public'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use('', login);
app.use('', signup);
app.use('', profile);
app.use('', dashboard);
app.use('', course);
app.use('', checkSession);
app.use('', logout);
app.use('', assignment);
app.listen(8000);
console.log("Server listening on port 8000");
