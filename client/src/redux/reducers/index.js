import {combineReducers} from 'redux';
import pubs from './pubs';
import auth from './auth';
import users from './users'
import cart from './cart'

export const rootReducer = combineReducers({
    pubs,
    auth,
    users,
    cart
})

