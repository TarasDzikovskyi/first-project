import * as api from '../API/index'
import axios from "axios";

export const login = (email, password, history) => async (dispatch) => {
    try {
        const {data} = await axios.post('http://localhost:5000/auth/login', {email, password})

        const setLogin = (user) => ({type: 'LOGIN', payload: user})

        history.push('/')
        dispatch(setLogin(data.user))
    } catch (error) {
        console.log(error)
    }
}

export const register = (name, email, born_year, password, history) => async (dispatch) => {
    try {

        const {data} = await axios.post('http://localhost:5000/auth/register', {name, email, born_year, password,})
        console.log(data)
        const setRegister = (user) => ({type: 'LOGIN', payload: user})

        history.push('/')
        dispatch(setRegister(data.user))
    } catch (error) {

        console.log(error)
    }
}
