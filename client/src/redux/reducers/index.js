import {combineReducers} from 'redux';
import {httpReducer} from './httpReducer';
import pubs from './pubs';
import auth from './auth';

export const rootReducer = combineReducers({
    httpReducer,
    pubs,
    auth
})

