import initial from './initialState';

const reducer = (state = initial, action) => {
    switch (action.type) {

        case "SAVE_QUIZ" : {

            return {...state,quiz:action.payload};

			
        }

        case "TAKE_QUIZ" : {

            return {...state, quiz_details: action.payload.data.quiz_details, quizid_details: action.payload.data.quizid_details}
        }

        case "SUBMIT_QUIZ" : {

            return {...state, quiz_ans: action.payload}
        }

        default :
            return state;
    }
}

export default reducer;