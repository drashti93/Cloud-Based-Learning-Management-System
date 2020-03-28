import {gql} from 'apollo-boost';

const addUserMutation = gql`
    mutation AddUser($user_id: Int, $name: String, $email: String, $password: String, $isStudent: String){
        addUser(user_id: $user_id, password: $password, name: $name, email: $email, isStudent: $isStudent){
            user_id,
            password,
            name,
            email,
            isStudent
        }
    }
`;

const addCourseMutation = gql`
    mutation AddCourse($user_id: Int, $course_id: Int, $course_name: String, $course_department: String, $course_description: String, $room_number: String, $student_capacity: Int, $waitlist_capacity: Int, $course_term: String){
        addCourse(user_id: $user_id, course_id: $course_id, course_name: $course_name, course_department: $course_department, course_description: $course_description, room_number: $room_number, student_capacity: $student_capacity, waitlist_capacity: $waitlist_capacity, course_term: $course_term){
            user_id,
            course_id,
            course_name,
            course_department,
            course_description,
            room_number,
            student_capacity,
            waitlist_capacity,
            course_term
        }
    }`;

const updateUser = gql`
mutation updateUser($user_id: Int, $email: String, $phone_number: Int, $about_me: String, $city: String, $country: String, $company: String, $school: String, $hometown: String, $languages: String, $gender: String){
    updateUser(user_id: $user_id, email: $email, phone_number: $phone_number, about_me: $about_me, school: $school, city: $city, country: $country, company: $company, hometown: $hometown, languages: $languages, gender: $gender){
        user_id,
    }
}`;

export {addUserMutation, addCourseMutation, updateUser}
