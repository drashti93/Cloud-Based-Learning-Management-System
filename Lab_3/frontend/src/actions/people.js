import axios from "axios"

export function getAllPeople() {

    console.log("Get all people ")
    return function(dispatch){
      
      axios.get('http://localhost:8000/api/getAllPeople/', {})
              .then(function (response) {
                //   console.log("Response from people");
                //   console.log(response.data.all_people);
                  if(response.status===200) {
  
                      dispatch({ type: "ALL_PEOPLE_SUCCESS", payload: response.data.all_people })
                  }
              })
              .catch(function (error) {
                  dispatch({type: "ALL_PEOPLE_FAILURE",payload: false})
              });
    }
  }