import axios from "axios";
import fileDownload from 'js-file-download';
const FormData = require('form-data');
const backend_ip = 'http://52.8.27.226:8000/api/';
export function addNewAnnouncement(id, details, name, user_id) {

  
  return function(dispatch){
    console.log(user_id);
    var course_id = sessionStorage.getItem("course_id")
    axios.post(backend_ip+'createAnnouncement', {
        id, details, name, user_id, course_id
    })
        .then(function (response) {
            console.log(response)
            if(response.code==200) {
                dispatch({ type: "CREATE_ANNOUNCEMENT_SUCCESS", payload: {} })
            }
        })
        .catch(function (error) {
            dispatch({type: "CREATE_ANNOUNCEMENT_FAILURE",payload: false})
        });
  
}
}
