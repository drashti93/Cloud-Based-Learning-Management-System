import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import dashboard from './dashboard';
import course from './course';
import assignment from './assignment';
import message from './message';
import people from './people';
import quiz from './quiz';
import announcement from './announcement'

const rootReducer = combineReducers({

    auth,
    profile,
    dashboard,
    course,
    assignment,
    message,
    people,
    quiz,
    announcement,
})

export default rootReducer;
