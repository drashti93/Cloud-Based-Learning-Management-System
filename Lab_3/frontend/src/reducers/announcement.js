import initial from './initialState';

const reducer = (state = initial, action) => {
    
    switch (action.type) {

        case "CREATE_ANNOUNCEMENT_SUCCESS" : {

            return {...state};

        }
                  
        default :
            return state;
    }
};

export default reducer;
