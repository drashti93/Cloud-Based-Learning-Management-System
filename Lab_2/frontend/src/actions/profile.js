import axios from "axios"
const backend_ip = 'http://52.8.27.226:8000/api/';
export function getProfile(user_id) {

  console.log("Inside action getProfile"+user_id);
  return function(dispatch){

    
      axios.get(backend_ip+'getProfile/'+user_id)
            .then(function (response) {
                
                console.log(response.data)
                dispatch({
                    type: "GET_PROFILE",
                    payload: response
                })
                
              
            })
            .catch(function (error) {
              console.log(error);
              
                  
              });
  }
}

export function setProfile(user_id, email, phone_number, about_me, city, company, school, country, hometown, languages, gender) {

  console.log("Inside Set Profile" + user_id+ email+ phone_number+ about_me+ city+ company+ school+ country+ hometown+ languages+ gender)
  return function(dispatch){
      axios.post(backend_ip+'setProfile', {
            
            user_id, email, phone_number, about_me, city, company, school, country, hometown, languages, gender
            
            })
            .then(function (response) {
                 
              console.log(response)

              dispatch({
                type: "SET_PROFILE",
                payload: response
              })
              
               

            })
            .catch(function (error) {
              console.log(error);
              
            
            });
  }
}

