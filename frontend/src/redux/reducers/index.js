import {combineReducers} from 'redux';
import {httpReducer} from './httpReducer';
import pubs from './pubs';

export const rootReducer = combineReducers({
    httpReducer,
    pubs
})

