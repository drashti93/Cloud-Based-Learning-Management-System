import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "COURSE_DETAILS_SUCCESS" : {

            return {...state,courseDetails:action.payload};

			
        }
        
        case "ALL_COURSE_SUCCESS" : {

            return {...state,all_courses:action.payload};

			
        }
        
        case "GENERATE_CODE" : {

            return {...state,code:action.payload};

			
        }
        
        case "SINGLE COMPONENT" : {
            console.log("Single")
            console.log(action.payload.data.component_details)
            return {...state,component_details:action.payload.data.component_details};

			
		}
                    
        default :
            return state;
    }
};

export default reducer;
