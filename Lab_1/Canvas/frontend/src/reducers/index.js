import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import dashboard from './dashboard';
import course from './course';
import assignment from './assignment';

const rootReducer = combineReducers({

    auth,
    profile,
    dashboard,
    course,
    assignment
})

export default rootReducer;
