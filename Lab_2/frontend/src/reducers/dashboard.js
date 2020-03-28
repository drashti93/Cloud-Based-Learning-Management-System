import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "SET_DASHBOARD" : {
            console.log("Dashboard action -> action payload")
            console.log(action.payload)
            console.log("Payload " + action.payload.code + action.payload.value)
            console.log(action.payload.data)
            if(action.payload.code==200)
			{
                console.log("reducer fired " + typeof action.payload.data)

                return {...state,
                            isLogged:true,
                            course_list:action.payload.value
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
