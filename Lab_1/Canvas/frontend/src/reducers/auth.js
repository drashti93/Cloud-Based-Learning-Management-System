import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {
        case "LOGIN_STATUS" : {
			console.log("userID Payload " + action.payload)
            
				console.log("reducer fired")
				return {...state,isLogged:true,user_id:action.payload};
			
				

		}

		case "LOGIN_FAILED" : {
				return {...state,isLogged:false};
				

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
            if(action.payload===true)
			{
                console.log("signup fired")
				return {...state,isSigned:true};
			}
			else
			{
				console.log('REDUCER ISVALID ' + action.payload);
				return {...state,isSigned:false};	
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
