import axios from "axios"
const headers = {
  'Accept': 'application/json'
};
const backend_ip = 'http://52.8.27.226:8000/api/';
export function getCourseDetails(course_id, user_id) {

  console.log("Get Course Details " + course_id +user_id)
  return function(dispatch){
    
    axios.get(backend_ip+'getCourseDetails/'+course_id+'/'+user_id, {})
            .then(function (response) {
              
                console.log("Course Details");
                // console.log(response);
                console.log(response.data.course_details)
                if(response.status===200) {

                    dispatch({ type: "COURSE_DETAILS_SUCCESS", payload: response.data.course_details })
                }
            })
            .catch(function (error) {
                dispatch({type: "COURSE_DETAILS_FAILURE",payload: false})
            });
  }
}

export function addCourse(user_id,course_id,course_name, course_department,course_description,room_number,student_capacity, waitlist_capacity, course_term,user_name) {

  console.log("ADD COURSE ACTION" + user_id)
  return function(dispatch){


      axios.post(backend_ip+'addCourse', {
            
          user_id,course_id,course_name, course_department,course_description,room_number,student_capacity, waitlist_capacity, course_term,user_name
            
            })
            .then(function (response) {
                console.log("Received Res ")
                console.log(response)
                if(response.status===200) {
                  
                    dispatch({
                      type: "ADD_COURSE",
                      payload: response
                  })

                }
              
            })
            .catch(function (error) {
              console.log(error);
              
                  dispatch({
                    type: "ADD_COURSE",
                    payload: false
                  })
              });
  }
}

export function getAllCourses(user_id) {

  console.log("Get all Courses " + user_id)
  return function(dispatch){
    
    axios.get(backend_ip+'getAllCourses/'+user_id, {})
            .then(function (response) {
                console.log(response)
                if(response.status===200) {

                    dispatch({ type: "ALL_COURSE_SUCCESS", payload: response.data.all_courses })
                }
            })
            .catch(function (error) {
                dispatch({type: "ALL_COURSE_FAILURE",payload: false})
            });
  }
}

export function enroll(user_id,course_id) {

  console.log("Enroll COURSE ACTION " + user_id + course_id)
  return function(dispatch){


      axios.post(backend_ip+'enroll', {
            
          user_id,course_id
            
            })
            .then(function (response) {
                console.log("Received Res ")
                console.log(response)
                console.log(course_id)
                if(response.status===200) {
                  
                    dispatch({
                      type: "ENROLL_COURSE",
                      payload: response
                  })

                }
              
            })
            .catch(function (error) {
              console.log("Enrollment error"+error);
              
                  dispatch({
                    type: "ENROLL_COURSE",
                    payload: false
                  })
              });
  }
}

export function drop(user_id,course_id) {

  console.log("Drop COURSE ACTION " + user_id + course_id)
  return function(dispatch){


      axios.post(backend_ip+'drop', {
            
          user_id,course_id
            
            })
            .then(function (response) {
                console.log("Received Res ")
                console.log(response)
                console.log(course_id)
                if(response.status===200) {
                  
                    dispatch({
                      type: "DROP_COURSE",
                      payload: response
                  })

                }
              
            })
            .catch(function (error) {
              console.log("Drop error"+error);
              
                  dispatch({
                    type: "DROP_COURSE",
                    payload: false
                  })
              });
  }
}

export function waitlist(user_id,course_id) {

  console.log("WAITLIST COURSE ACTION " + user_id + course_id)
  return function(dispatch){


      axios.post(backend_ip+'waitlist', {
            
          user_id,course_id
            
            })
            .then(function (response) {
                console.log("Received Res ")
                console.log(response)
                console.log(course_id)
                if(response.status===200) {
                  
                    dispatch({
                      type: "WAITLIST_COURSE",
                      payload: response
                  })

                }
              
            })
            .catch(function (error) {
              console.log("Waitlist error"+error);
              
                  dispatch({
                    type: "WAITLIST_COURSE",
                    payload: false
                  })
              });
  }
}

export function genCode(user_id,course_id) {

  console.log("Generate Code ACTION " + user_id + course_id)
  return function(dispatch){


      axios.post(backend_ip+'gencode', {
            
          user_id,course_id
            
            })
            .then(function (response) {
                console.log("Received Res ")
                console.log(response)
                console.log(course_id)
                if(response.status===200) {
                  
                    dispatch({
                      type: "GENERATE_CODE",
                      payload: response
                  })

                }
              
            })
            .catch(function (error) {
              console.log("Generate code error"+error);
              
                  dispatch({
                    type: "GENERATE_CODE",
                    payload: false
                  })
              });
  }
}





export function getSingleComponentDetails( type ,id, course_id) {
  console.log("Incoming data"+type+" "+id)
  type = type.toLowerCase();
  return function(dispatch){
      axios.get(backend_ip+''+type+"/"+id+"/"+course_id, {})
            .then(function (response) {
               if(response.status===200) {
                 console.log(response)
                  dispatch({
                      type: "SINGLE COMPONENT",
                      payload: response
                  })
              }
            })
            .catch(function (error) {
              dispatch({
                    type: "SINGLE COMPONENT",
                    payload: false
                  })
              });
    }
}

export function getCode(code, user_id, course_id) {

  console.log("Get code " + code +user_id + course_id)
  return function(dispatch){
    
    axios.get(backend_ip+'getCode/'+code+'/'+user_id+'/'+course_id, {})
            .then(function (response) {
                console.log(response)
                if(response.status===200) {

                    dispatch({ type: "GET_CODE", payload: true })
                }
            })
            .catch(function (error) {
                dispatch({type: "GET_CODE",payload: false})
            });
  }
}

export function submitGrades(grade,submission_id) {

  console.log("Generate Code ACTION " + grade + submission_id)
  return function(dispatch){


      axios.post(backend_ip+'submitGrades', {
            
          grade,submission_id
            
            })
            .then(function (response) {
                console.log("Received Res ")
                console.log(response)
                console.log(submission_id)
                if(response.status===200) {
                  
                    dispatch({
                      type: "SUBMIT_GRADE",
                      payload: response
                  })

                }
              
            })
            .catch(function (error) {
              console.log("Generate code error"+error);
              
                  dispatch({
                    type: "SUBMIT_GRADE",
                    payload: false
                  })
              });
  }
}