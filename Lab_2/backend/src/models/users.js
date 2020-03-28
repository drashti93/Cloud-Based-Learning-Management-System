var mongoose =require('mongoose');
var Schema = mongoose.Schema;

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

var Users = mongoose.model("users", UsersSchema, "users")
module.exports = Users;