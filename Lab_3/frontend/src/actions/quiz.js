import axios from "axios";
import fileDownload from 'js-file-download';
const FormData = require('form-data');

export function saveQuiz(finalObject, id, name, instructions, date, course_id) {

  
    return function(dispatch){

        console.log("Body -> ")
        console.log(finalObject)
        axios.post('http://localhost:8000/api/saveQuiz', {
              
            finalObject, id, name, instructions, date, course_id

              })
              .then(function (response) {
                  console.log("Received Res ")
                  console.log(response)
                  if(response.status===200) {
                    
                      dispatch({
                        type: "SAVE_QUIZ",
                        payload: response
                    })
  
                  }
                
              })
              .catch(function (error) {
                console.log(error);
                
                    dispatch({
                      type: "SAVE_QUIZ",
                      payload: false
                    })
                });
    }
  }

  export function getQuizDetails(quiz_id) {

    console.log("Get Quiz Details " + quiz_id)
    return function(dispatch){
      
      axios.get('http://localhost:8000/api/getQuizDetails?quiz_id='+quiz_id)
              .then(function (response) {
                  console.log("Quiz details")
                  console.log(response.data.quiz_details)
                  console.log("Quiz id details")
                  console.log(response.data.quizid_details)
                  if(response.status===200) {
  
                      dispatch({ type: "TAKE_QUIZ", payload: response })
                  }
              })
              .catch(function (error) {
                  dispatch({type: "TAKE_QUIZ",payload: false})
              });
    }
  }

  export function submitQuiz(user_id, quiz_answers, id, course_id) {

  
    return function(dispatch){

        console.log("user_id -> ")
        console.log(user_id)
        console.log("quiz_answers->")
        console.log(quiz_answers)
        console.log("quiz id ->")
        console.log(id)
        console.log("course_id ->")
        console.log(course_id)
        axios.post('http://localhost:8000/api/submitQuiz', {
              
            user_id, quiz_answers, id, course_id

              })
              .then(function (response) {
                  console.log("Received Res ")
                  console.log(response)
                  if(response.status===200) {
                    
                      dispatch({
                        type: "SUBMIT_QUIZ",
                        payload: response
                    })
  
                  }
                
              })
              .catch(function (error) {
                console.log(error);
                
                    dispatch({
                      type: "SUBMIT_QUIZ",
                      payload: false
                    })
                });
    }
  }