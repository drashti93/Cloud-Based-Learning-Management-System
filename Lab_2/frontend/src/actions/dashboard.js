import axios from "axios"
const backend_ip = 'http://52.8.27.226:8000/api/';
export function getDashboardcourses(user_id) {

  console.log("Inside action getCourse"+user_id);
  return function(dispatch){

    
      axios.get(backend_ip+'getDashboardcourses/'+user_id)
            .then(function (response) {

                console.log("dashboard")
                console.log(response)
                dispatch({
                    type: "SET_DASHBOARD",
                    payload: response.data
                })
                
              
            })
            .catch(function (error) {
              console.log(error);
              
                  
              });
  }
}