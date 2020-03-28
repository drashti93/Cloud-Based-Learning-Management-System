import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "CREATE_ASSIGNMENT_SUCCESS" : {

            return {...state};

        }
        
        case "UPLOAD_FILE_SUCCESS" : {

            return {...state};

		}
                    
        default :
            return state;
    }
};

export default reducer;
