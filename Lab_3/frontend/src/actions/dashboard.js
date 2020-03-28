import axios from "axios"

export function getDashboardcourses(user_id) {

  console.log("Inside action getCourse"+user_id);
  return function(dispatch){

    
      axios.get('http://localhost:8000/api/getDashboardcourses/'+user_id)
            .then(function (response) {

                console.log("dashboard")
                console.log(response.data.course_details)
                dispatch({
                    type: "SET_DASHBOARD",
                    payload: response
                })
                
              
            })
            .catch(function (error) {
              console.log(error);
              
                  
              });
  }
}