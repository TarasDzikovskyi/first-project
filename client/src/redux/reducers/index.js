import {combineReducers} from 'redux';
import pubs from './pubs';
import auth from './auth';
import users from './users'

export const rootReducer = combineReducers({
    pubs,
    auth,
    users
})

