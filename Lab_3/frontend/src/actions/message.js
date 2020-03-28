import axios from "axios"

export function getAllMessages(user_id) {

    console.log("Get all messages action " + user_id)
    return function(dispatch){
      
        axios.get('http://localhost:8000/api/getAllMessages?user_id='+user_id)
              .then(function (response) {
                  console.log(response)
                  if(response.status===200) {
  
                      dispatch({ type: "ALL_MESSAGE_SUCCESS", payload: response.data.all_messages })
                  }
              })
              .catch(function (error) {
                  dispatch({type: "ALL_MESSAGE_FAILURE",payload: false})
              });
    }
  }

export function sendMessage(sender_user_id, receiver_user_id, message_body) {

    console.log("send messages sender: " + sender_user_id+ " receiver: "+receiver_user_id+ " message: "+message_body)
    return function(dispatch){
      
      axios.post('http://localhost:8000/api/sendMessage', {
          sender_user_id, receiver_user_id, message_body
      })
              .then(function (response) {
                  console.log(response)
                  if(response.status===200) {
  
                      dispatch({ type: "ALL_MESSAGE_SUCCESS", payload: true })
                  }
              })
              .catch(function (error) {
                  dispatch({type: "ALL_MESSAGE_FAILURE",payload: false})
              });
    }
  }