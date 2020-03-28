import axios from "axios";
import fileDownload from 'js-file-download';
const FormData = require('form-data');

export function addNewAnnouncement(id, details, name, user_id) {

  
  return function(dispatch){
    console.log(user_id);
    var course_id = sessionStorage.getItem("course_id")
    axios.post('http://localhost:8000/api/createAnnouncement', {
        id, details, name, user_id, course_id
    })
        .then(function (response) {
            console.log(response)
            if(response.status===200) {
                dispatch({ type: "CREATE_ANNOUNCEMENT_SUCCESS", payload: {} })
            }
        })
        .catch(function (error) {
            dispatch({type: "CREATE_ANNOUNCEMENT_FAILURE",payload: false})
        });
  }
}