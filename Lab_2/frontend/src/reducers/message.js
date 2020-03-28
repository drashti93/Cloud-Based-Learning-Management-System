import initial from './initialState';

const reducer = (state = initial, action) => {
    switch (action.type) {

        case "ALL_MESSAGE_SUCCESS" : {

            return {...state,all_messages:action.payload};

			
        }

        default :
            return state;
    }
}

export default reducer;