import axios from "axios";
import swal from 'sweetalert';
const headers = {
  'Accept': 'application/json'
};

const backend_ip = 'http://52.8.27.226:8000/api/';
export function login(user_id,password) {

  
  return function(dispatch){

          fetch(backend_ip+'login', {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify({user_id,password})
        }).then(function (response) {
              console.log("response : -----" )
              console.log(response)

              response.json().then(res => {
                console.log(res)
                if(response.status===200) {
                  localStorage.setItem('myjwttoken', res.values.token);
                    dispatch({
                      type: "LOGIN_STATUS",
                      
                      payload: res.user_id
                      
                    })
                }
                else{
                  dispatch({
                    type: "LOGIN_FAILED",
                    payload: res.message
                  })
                }

              })
        })
        .catch(error => {
          console.log(error);
              
                  dispatch({
                    type: "LOGIN_FAILED",
                    payload: false
                  })
      })


  }
}

export function signup(fullname,email,user_id,password, isStudent) {

  console.log("Action Signup " + isStudent)
  return function(dispatch){
      axios.post(backend_ip+'signup', {
            
                  fullname,email,user_id,password,isStudent
            
            })
            .then(function (response) {
              console.log(response)
              if(response.status===200) {
                
                dispatch({
                    type: "SIGNUP_STATUS",
                    payload: response.data.message
                })


              }
              else {
                dispatch({
                  type: "SIGNUP_STATUS",
                  payload: response.message
                })
              }
            })

            
            .catch(function (error) {
              console.log(error);
              dispatch({
                type: "SIGNUP_STATUS",
                payload: false
              })
              
            });
  }
}

export function checkSession(){
  return function(dispatch){
    console.log("Check Session Action")
    fetch(backend_ip+'checkSession', {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          credentials:'include',
          body: JSON.stringify({})
      }).then(function (response) {
            console.log("Session : -----" )
            console.log(response)

            response.json().then(res => {
              console.log("Checking received response");
              console.log(res)
              if(response.status===200) {
              
                  dispatch({
                    type: "SESSION_SUCCESS",
                    
                    payload: res
                    // payload: user_id
                  })
              }else{
                dispatch({
                  type: "SESSION_FAILED",
                  payload: false
                })
              }

            })
      })
        .catch(error => {
          console.log(error);
              
                  dispatch({
                    type: "SESSION_FAILED",
                    payload: false
                  })
      })
  }
}


export function logout(){
  console.log("Action logout ")

  return function(dispatch){
    
    fetch(backend_ip+'logout', {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          credentials:'include',
          body: JSON.stringify({})
      }).then(function (response) {
            console.log("Logout received" )
            console.log(response)

            response.json().then(res => {
              console.log(res)
              if(response.status===200) {
              
                dispatch({
                  type: "LOGOUT_STATUS",
                  payload: true
                })

              }else{
                dispatch({
                  type: "LOGOUT_STATUS",
                  payload: false
                })
              }

            })
      })
        .catch(error => {
          console.log(error);
              
            dispatch({
              type: "LOGOUT_STATUS",
              payload: false
            })
      })
  }
}