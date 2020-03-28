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

var Courses = mongoose.model("courses", CoursesSchema, "courses")
module.exports = Courses;