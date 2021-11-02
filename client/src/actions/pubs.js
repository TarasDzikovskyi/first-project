import * as api from '../API'
import axios from "axios";

export const getPubs = (page) => async (dispatch) => {
    try {
        const {data} = await api.fetchPubs(page);
        console.log(data)

        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (e) {
        console.log(e.message);
    }
}

export const getPubsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data: {data}} = await api.fetchPubsBySearch(searchQuery);

        dispatch({type: 'FETCH_BY_SEARCH', payload: data});
    } catch (e) {
        console.log(e.message);
    }
}

export const createPub = (pub) => async (dispatch) => {
    try {
        const {data} = await api.fetchPubs(pub);

        dispatch({type: 'CREATE', payload: data})

    } catch (e) {
        console.log(e.message)
    }
}

export const updatePub = (id, pub) => async (dispatch) => {
    try {
        const {data} = await api.updatePub(id, pub);

        dispatch({type: 'UPDATE', payload: data})
    } catch (e) {
        console.log(e.message)
    }
}

export const likePub =(id) => async (dispatch) => {
    try {
        const {data} = await api.likePub(id)

        dispatch({type: 'LIKE', payload: data})
    } catch (e) {
        console.log(e.message)
    }
}

export const deletePub = (id) => async (dispatch) => {
    try {
        const {data} =await api.deletePub(id)
        console.log('data', data);


        dispatch({type: 'DELETE', payload: id})
    } catch (e) {
        console.log(e.message)
    }
}
