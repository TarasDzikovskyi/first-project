import * as api from '../API'

export const getPub = (id) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchPub(id);

        dispatch({type: 'FETCH_PUB', payload: {pub: data}});
        // dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message)
    }
}

export const getPubs = (page) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data, currentPage, numberOfPages}} = await api.fetchPubs(page);
        console.log(data)

        dispatch({type: 'FETCH_ALL', payload: {data, currentPage, numberOfPages}});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

export const getPubsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data}} = await api.fetchPubsBySearch(searchQuery);

        dispatch({type: 'FETCH_BY_SEARCH', payload: {data}});
        dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message);
    }
}

export const createPub = (pub) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})

        const {data} = await api.fetchPubs(pub);

        dispatch({type: 'CREATE', payload: data})

        // history.push(`/pubs/${data._id}`);
    } catch (e) {
        console.log(e.message)
    }
}

export const updatePub = (id, pub) => async (dispatch) => {
    try {
        const {data} = await api.updatePub(id, pub);
        console.log(data)

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

export const commentPub = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value, id)
        console.log(data)

        dispatch({type: 'COMMENT', payload: data})
        return data.comments

    } catch (e) {
        console.log(e)
    }
}

export const deletePub = (id) => async (dispatch) => {
    try {
        await api.deletePub(id)

        dispatch({type: 'DELETE', payload: id})
    } catch (e) {
        console.log(e.message)
    }
}
