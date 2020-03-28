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

var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var CoursesSchema = new Schema({
    course_id : Number,
    course_name : String,
    course_description : String,
    course_department : String,
    student_capacity : Number,
    waitlist_capacity : Number,
    room_number : String,
    course_term : String,
    user_id : Number,
    user_name: String,
    enrollment_count : Number,
    announcements: [
        {
            id: Number,
            user_id: Number,
            title: String,
            details: String,
            date: Date
        }
    ],
    assignments: [
        {
            id: Number,
            title: String,
            details: String,
            assignment_file: String,
            date: Date
        }
    ],
    files: [
        {
            file_name: String,
            location: String
        }
    ],
    quizzes: [
        {
            id: Number,
            title: String,
            date: Date,
            details: String,
            questions: [
                {
                    question: String,
                    ans_1: String,
                    ans_2: String,
                    ans_3: String,
                    ans_4: String,
                    isRight: String,
                    points: Number
                }
            ]
        }
    ],
    waitlist: [
        {
            id: Number,
            user_id: Number,
            permission_code: Number
        }
    ]
})

var UsersSchema = new Schema({
    user_id : Number,
    name : String,
    email : String,
    password : String,
    profile_img : String,
    phone_number : Number,
    about_me : String,
    city : String,
    country : String,
    company : String,
    school : String,
    hometown : String,
    languages : String,
    gender : String,
    isStudent : String,
    profile_img: String,
    courses: [
        {
            course_id: Number,
        }
    ],
    submissions: [
        {
            course_id: Number,
            assignment_id: Number,
            assignment_name: String,
            isSubmitted: String,
            grade: Number,
            from_grade: Number,
            file_name: String,
            location: String,
            stype: String 
        }
    ],
    messages: [
        {
            
            toid: Number,
            toName: String,
            fromid: Number,
            fromName: String,
            message: String,
            timeStamp: Date,
        }
    ],
})


module.exports.Users = mongoose.model("users", UsersSchema)
module.exports.Courses = mongoose.model("courses", CoursesSchema, "courses")
// module.exports = {mongoose};

