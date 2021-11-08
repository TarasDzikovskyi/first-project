import {combineReducers} from 'redux';
import pubs from './pubs';
import auth from './auth';

export const rootReducer = combineReducers({
    pubs,
    auth
})

