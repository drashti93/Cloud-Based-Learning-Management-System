var express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
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
var MongoDBStore = require('connect-mongodb-session')(session);
var assignment = require('./src/routes/assignment');
var announcement = require('./src/routes/announcement');
var message = require('./src/routes/message');
var people = require('./src/routes/people');
var saveQuiz = require('./src/routes/quiz');
const passport = require('passport');
var mongoose = require('./src/resources/mongoose');
var requireAuth = passport.authenticate('jwt', {session: false});
var jwt = require('jsonwebtoken');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/static',express.static(__dirname + 'public'));
app.use(passport.initialize());

var config = {
  
  server: 'localhost',
  port : '3306',
  user: 'root',
  password: 'Root@123',
  database: 'Canvas_Lab1'
}


// var sessionStore = new MySQLStore(config);
var sessionStore = new MongoDBStore({
  uri: 'mongodb://root:root@cluster0-shard-00-00-ggwql.mongodb.net:27017,cluster0-shard-00-01-ggwql.mongodb.net:27017,cluster0-shard-00-02-ggwql.mongodb.net:27017/Canvas_lab2?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
  collection: 'c_sessions'
});

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
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

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
app.use('', message);
app.use('', assignment);
app.use('', saveQuiz);
app.use('', announcement)

app.use('', people);
// app.listen(8000);
// console.log("Server listening on port 8000");

app.listen(4000, () => {
  console.log("Listening on port 4000")
})
