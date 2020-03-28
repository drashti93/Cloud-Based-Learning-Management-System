var mongoose = require('mongoose');
// const uri = "mongodb+srv://root:root@cluster0-shard-00-00-ggwql.mongodb.net:27017/Canvas_Lab2?retryWrites=true";

// var uri = 'mongodb://root:root@' +
//   'cluster0-shard-00-00-ggwql.mongodb.net:27017,' +
//   'cluster0-shard-00-01-ggwql.mongodb.net:27017,' +
//   'cluster0-shard-00-02-ggwql.mongodb.net:27017,'
//   'ssl=true&replicaSet=cluster0-ggwql.mongodb.net&authSource=admin';

var uri = "mongodb://root:root@cluster0-shard-00-00-ggwql.mongodb.net:27017,cluster0-shard-00-01-ggwql.mongodb.net:27017,cluster0-shard-00-02-ggwql.mongodb.net:27017/Canvas_lab2?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.Promise = global.Promise;
mongoose.connect(uri).then(
    () => { console.log("Connected to MongoDB") },
    err => { console.log("Did not connect", err) }
  );

module.exports = {mongoose};