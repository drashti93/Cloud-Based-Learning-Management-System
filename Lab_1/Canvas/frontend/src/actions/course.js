import axios from "axios"

export function getCourseDetails(course_id) {

  console.log("Get Course Details " + course_id)
  return function(dispatch){
    
    axios.get('http://localhost:8000/api/getCourseDetails/'+course_id, {})
            .then(function (response) {
                console.log(response)
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


      axios.post('http://localhost:8000/api/addCourse', {
            
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
    
    axios.get('http://localhost:8000/api/getAllCourses/'+user_id, {})
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


      axios.post('http://localhost:8000/api/enroll', {
            
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


      axios.post('http://localhost:8000/api/drop', {
            
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


      axios.post('http://localhost:8000/api/waitlist', {
            
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


      axios.post('http://localhost:8000/api/gencode', {
            
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





export function getSingleComponentDetails( type ,id) {
  console.log("Incoming data"+type+" "+id)
  type = type.toLowerCase();
  return function(dispatch){
      axios.get('http://localhost:8000/api/'+type+"/"+id, {})
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