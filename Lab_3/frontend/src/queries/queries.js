import {gql} from 'apollo-boost';

const userLogin = gql`
query userLogin($user_id: Int, $password: String){
        userLogin(user_id: $user_id, password: $password){
                user_id
                password
                jwttoken
                name
                isStudent
        }
    }`

const allCourses = gql`
query allCourses($user_id: Int){
    allCourses(user_id: $user_id){
        user_id
        courses {
            course_id,
            course_name,
            course_description,
            course_department,
            student_capacity,
            waitlist_capacity,
            enrollment_count,
            course_term,
            room_number,
            user_id,
            user_name,
            enrolled,
        }
    }
}`;

const userProfile = gql`
query userProfile($user_id: Int){
    userProfile(user_id: $user_id){
        user_id
        profile {
            name,
            email,
            phone_number,
            about_me,
            city,
            country,
            company,
            school,
            hometown,
            languages,
            gender,
            isStudent,
        }
    }
}`;

export {userLogin, allCourses, userProfile};