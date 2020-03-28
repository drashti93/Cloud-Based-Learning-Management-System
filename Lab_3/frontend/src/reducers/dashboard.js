import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "SET_DASHBOARD" : {
            console.log(action.payload)
            console.log("Payload " + action.payload.status + action.payload.data.user_id)
            console.log(action.payload.data)
            if(action.payload.status===200)
			{
                console.log("reducer fired " + typeof action.payload.data)

                return {...state,
                            isLogged:true,
                            course_list:action.payload.data.course_details
                       };
			}
			else
			{
				console.log('REDUCER ISVALID ' + action.payload);
				return {...state};	
			}	
			
		}
                    
        default :
            return state;
    }
};

export default reducer;
