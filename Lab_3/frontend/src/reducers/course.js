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
            console.log(action.payload.data.assignment_submissions)
            return {...state,component_details:action.payload.data.component_details, assignment_submissions:action.payload.data.assignment_submissions};

			
        }
        
        case "SUBMIT_GRADE" : {

            return {...state,code:action.payload};

			
        }
                    
        default :
            return state;
    }
};

export default reducer;
