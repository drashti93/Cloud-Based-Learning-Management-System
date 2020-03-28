import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {
        case "LOGIN_STATUS" : {
			console.log("userID Payload " + action.payload)
            
				console.log("reducer fired")
				return {...state,isLogged:true,user_id:action.payload};
			
				

		}

		case "LOGIN_FAILED" : {
				console.log("Login failed")
				return {...state,isLogged:false,message:action.payload};
				

		}

		case "SESSION_SUCCESS" : {
			console.log("userID Payload " + action.payload)
            
				console.log("reducer fired")
				return {...state,isLogged:true,user_id:action.payload.user_id,isStudent:action.payload.isStudent};
			
				

		}

		case "SESSION_FAILED" : {
			console.log("userID Payload " + action.payload)
            
				console.log("reducer fired")
				return {...state,isLogged:false,user_id:''};
			
				

		}

		case "SIGNUP_STATUS" : {
			console.log("Action Payload");
			console.log(action.payload);
            if(action.payload ==='right')
			{
				console.log("signup fired")
				console.log(action.payload)
				return {...state,isSigned:true,message: action.payload};
			}
			else if(action.payload='wrong')
			{
				console.log('REDUCER ISVALID ' + action.payload);
				return {...state,isSigned:false,message: action.payload};	
			}	

		}
		
		case "LOGOUT_STATUS" : {
            if(action.payload===true)
			{
                console.log("logout fired")
				return {...state,isLogged: false,user_id:""};
			}
			else
			{
				console.log('REDUCER ISVALID ' + action.payload);
				return {...state,isLogged:true};	
			}	

        }

        default :
            return state;
    }
};

export default reducer;
