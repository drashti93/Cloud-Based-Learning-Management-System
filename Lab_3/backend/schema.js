const graphql = require('graphql');
const _ = require('lodash');
var Users = require('./src/models/users');
var Courses = require('./src/models/courses');
var CSessions = require('./src/models/c_sessions');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('./src/config/config');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// type Course {course: GraphQLInt}
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        user_id : {type: GraphQLInt},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone_number: { type: GraphQLInt },
        about_me: { type: GraphQLString },
        city: { type: GraphQLString },
        country: {type: GraphQLString},
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString },
        isStudent: { type: GraphQLString },
        jwttoken : {type: GraphQLString},
        profile: {type: UserType},
        courses: {type: new GraphQLList(GraphQLInt)}
    })
});

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: ( ) => ({
        course_id : {type: GraphQLInt},
        course_name : {type: GraphQLString},
        course_description : {type: GraphQLString},
        course_department : {type: GraphQLString},
        student_capacity : {type: GraphQLInt},
        waitlist_capacity : {type: GraphQLInt},
        room_number: {type: GraphQLString},
        course_term: {type: GraphQLString},
        user_id: {type: GraphQLInt},
        user_name: {type: GraphQLString},
        enrollment_count: {type: GraphQLString},
        enrolled: {type: GraphQLString},
        courses: {type: new GraphQLList(CourseType)}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userLogin: {
            type: UserType,
            args: { 
                user_id: { type: GraphQLInt },
                password: { type: GraphQLString }, 
            },
            async resolve(parent, args){
               var user_id = parseInt(args.user_id, 10)
               console.log(user_id)
               const user = await Users.findOne({
                    user_id : user_id
                    })
                    console.log(user)
                        if (user) {
                            var encrypted = await bcrypt.compare(args.password, user.password)
                            console.log(encrypted)
                            if (encrypted){
                                let temp = await jwt.sign({ user: user }, jwtkey.jwtSecret, { expiresIn: '10080s' })
                                if(temp){
                                    var token = 'JWT ' + temp;
                                    console.log(token);
                                    var x = {temp : token}
                                    console.log("x", x);
                                    Object.assign(user,{jwttoken : token})
                                    console.log(typeof(user) + "user typeof")
                                    console.log("user after obj.assign" + user)
                                    return user
                                }
                                
                            }
                            
                        }
                        else{
                            return {error :"User does not exists"}
                        }
            }
        },

        allCourses: {
            type: CourseType,
            args: {
                user_id: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                console.log("In query backend")
                var q1 ;
                var q2 = [];
                var q3 = [];
                var q4 = [];
                var courses = await Users.findOne({
                    user_id: args.user_id
                }, {_id: 0, "courses.course_id": 1})
                .then((response) => {
                    console.log(response)
                    
                    q1 = response.courses
                    console.log("q1" +q1);
                    for(x in q1){
                        if(x < q1.length){
                            q2.push(q1[x].course_id)
                        }
                    }
                    console.log(q2)
                    q1 = q2
                    console.log("q1new" +q1)
                    for(x in q1){
                        if(x < q1.length){
                            q3.push(q1[x])
                        }
                    }
                    console.log(q3)
                })
                
                var userCourses = await Courses.aggregate(
                    [{$match: {course_id: {$nin: q3}}},
                    {$addFields: {enrolled: "no"}}])
                for(x in userCourses){
                    q4.push(userCourses[x])
                }
                console.log("usercourse "+q4)
                
                var aggCourses = await Users.aggregate([
                    {
                        $match: {user_id: args.user_id}
                    }, 
                    {
                        $lookup: {
                            from: "courses", 
                            localField: "courses.course_id", 
                            foreignField: "course_id", 
                            as: "course_details"
                        }
                    },
                    {
                        $unwind: "$course_details"
                    },
                    {
                        $project: {
                            _id: 0, 
                            "course_details": 1
                        }
                    },
                    {
                        $addFields: {"course_details.enrolled": "yes"}
                    }
                    ])
                for(x in aggCourses){
                    q4.push(aggCourses[x].course_details)
                }
                if(q4){
                    console.log(q4)
                    return {courses: q4};
                }
                else {
                    return {error :"Error"}
                }
            }
            
        },
        
        userProfile : {
            type: UserType,
            args: {
                user_id: {type: GraphQLInt}
            },
            async resolve(parent, args){
                var profile = await Users.find({
                    user_id: args.user_id
                }, {_id: 0})
                console.log(profile[0])
                if(profile){
                    return {user_id: profile[0].user_id, profile: profile[0]}
                }
                else {
                    return {error: "error"}
                }
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                user_id : {type: GraphQLInt},
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                isStudent: {type: GraphQLString}
            }, 
            async resolve(parent, args){
                var salt = bcrypt.genSaltSync(10);
                var encryptedpassword = bcrypt.hashSync(args.password, salt);
                const signupquery = await Users.findOne({
                    user_id : args.user_id
                })
                console.log("signupquery", signupquery)
                if (signupquery) {
                    return { error: "User already exists" };
                }
                else if(signupquery == null){
                    var user = new Users({
                        user_id : args.user_id,
                        name: args.name,
                        email: args.email,
                        password: encryptedpassword,
                        isStudent: args.isStudent,
                    })
                    console.log("Signup user successful",user)
                    user.save()
                    return user;
                }
            }
        },

        addCourse: {
            
            type: CourseType,
            args: {
                course_id : {type: GraphQLInt},
                course_name : {type: GraphQLString},
                course_description : {type: GraphQLString},
                course_department : {type: GraphQLString},
                student_capacity : {type: GraphQLInt},
                waitlist_capacity : {type: GraphQLInt},
                room_number: {type: GraphQLString},
                course_term: {type: GraphQLString},
                user_id: {type: GraphQLInt},
                enrollment_count: {type: GraphQLString},
            }, 
            async resolve(parent, args){
                console.log("In add course");
                var course = new Courses({
                    course_id : args.course_id,
                    course_name : args.course_name,
                    course_description : args.course_description,
                    course_department : args.course_department,
                    student_capacity : args.student_capacity,
                    waitlist_capacity : args.waitlist_capacity,
                    room_number: args.room_number,
                    course_term: args.course_term,
                    user_id: args.user_id,
                    enrollment_count: args.enrollment_count,
                })     
                var courseResult = await course.save()
                console.log("course add successful",courseResult)
                if(courseResult){
                    var userUpdate = await Users.updateOne({
                        user_id: args.user_id
                    }, {
						$push: 	{
									courses: 
										{
											course_id: args.course_id
										}
								}
                    })
                return userUpdate
                }
                else
                    return {error:"Course error"}
                }
                },

        updateUser: {
            type: UserType,
            args: {
                user_id: {type : GraphQLInt},
                email: { type: GraphQLString },
                phone_number: { type: GraphQLInt },
                about_me: { type: GraphQLString },
                city: { type: GraphQLString },
                country: {type: GraphQLString},
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                languages: { type: GraphQLString },
                gender: { type: GraphQLString },
            }, 
            async resolve(parent, args){
                const updateUserResult = await Users.update(
                    {
                        user_id: args.user_id
                    },
                    { $set: 
                        {
                            email: args.email,
                            phone_number: args.phone_number,
                            about_me: args.about_me,
                            city: args.city,
                            company: args.company,
                            school: args.school,
                            country: args.country,
                            hometown: args.hometown,
                            languages: args.languages,
                            gender: args.gender
                        }
                    })
                        
                        console.log("updateUserResult",updateUserResult)
                        if(updateUserResult)
                        return updateUserResult;
                    else
                        return {error:"User update error"}
                    }

                }
            }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});