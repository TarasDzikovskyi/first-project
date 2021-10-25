import * as api from '../API'

export const getPubs = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPubs();
        console.log(data)

        dispatch({type: 'FETCH_ALL', payload: data});
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
