import initial from './initialState';

const reducer = (state = initial, action) => {
    switch (action.type) {

        case "ALL_PEOPLE_SUCCESS" : {

            return {...state,all_people:action.payload};

			
        }

        default :
            return state;
    }
}

export default reducer;