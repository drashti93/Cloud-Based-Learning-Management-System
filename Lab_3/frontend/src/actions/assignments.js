import axios from "axios";
import fileDownload from 'js-file-download';
const FormData = require('form-data');

export function addNewAssignment(state) {

  
  return function(dispatch){
    let formData = new FormData();
    formData.append("assignment_file", state.assignment_file[0]);
    axios.post('http://localhost:8000/api/createAssignment?assignment_id='+state.assignment_id+'&assignment_name='+state.assignment_name+
        '&assignment_description='+state.assignment_description+'&assignment_dept='+state.assignment_dept+'&assignment_date='+state.assignment_date+'&assignment_grade='+state.assignment_grade+
        '&assignment_file='+state.assignment_file[0].name+'&course_id='+sessionStorage.getItem("course_id"), formData,{"content-type": "multipart/form-data"})
        .then(function (response) {
            console.log(response)
            if(response.status===200) {
                dispatch({ type: "CREATE_ASSIGNMENT_SUCCESS", payload: {} })
            }
        })
        .catch(function (error) {
            dispatch({type: "CREATE_ASSIGNMENT_FAILURE",payload: false})
        });
  }
}

export function downloadAssignment(assignment_file) {

  
  return function(dispatch){
    axios.get('http://localhost:8000/api/downloadFile?assignment_file='+assignment_file, { responseType: 'arraybuffer' })
        .then(function (response) {
            if(response.status===200) {
                fileDownload(response.data, assignment_file);
                dispatch({ type: "DOWNLOAD_ASSIGNMENT_SUCCESS", payload: {} })
            }
        })
        .catch(function (error) {
            dispatch({type: "DOWNLOAD_ASSIGNMENT_FAILURE",payload: false})
        });
  }
}

export function uploadFile(course_id,user_id, file, flag, assignmentid) {

  
    return function(dispatch){
      let formData = new FormData();
      formData.append("upload_file", file[0]);
      axios.post('http://localhost:8000/api/uploadfile?course_id='+course_id+'&user_id='+user_id+'&upload_file_name='+file[0].name+'&flag='+flag+'&assignmentid='+assignmentid, formData,{"content-type": "multipart/form-data"})
          .then(function (response) {
              console.log(response)
              if(response.status===200) {
                  dispatch({ type: "UPLOAD_FILE_SUCCESS", payload: {} })
              }
          })
          .catch(function (error) {
              dispatch({type: "UPLOAD_FILE_FAILURE",payload: false})
          });
    }
  }