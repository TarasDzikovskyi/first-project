import * as api from '../API'
import axios from "axios";

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

export const getAllPubs = () => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchAllPubsByAdmin();
        console.log(data)

        dispatch({type: 'FETCH_PUBS_BY_ADMIN', payload: data});
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

export const getPubsByOnlySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data}} = await api.fetchPubsByOnlySearch(searchQuery);

        dispatch({type: 'FETCH_BY_SEARCH', payload: {data}});
        dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message);
    }
}

export const activatePub = (id) => async (dispatch) => {
    try {
        const {data} = await api.activatePub(id)

        dispatch({type: 'ACTIVATE', payload: data})

    } catch (e) {
        console.log(e)
    }
}

export const createPub = (pub) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})

        const {data} = await api.createPub(pub);

        dispatch({type: 'CREATE', payload: data})

        // history.push(`/pubs/${data._id}`);
    } catch (e) {
        console.log(e.message)
    }
}

export const updatePub = (id, pub) => async (dispatch) => {
    try {

        dispatch({type: 'START_LOADING'})

        const {data} = await api.updatePub(id, pub);
        console.log(data)

        dispatch({type: 'UPDATE', payload: data})
        dispatch({type: 'END_LOADING'})

    } catch (e) {
        console.log(e.message)
    }
}

export const newsPub = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.news(value, id)

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






export const newReview = (rating, comment, pub_id, user_id, user_name) => async (dispatch) => {
    try {
        const {data}  = await api.newReview(rating, comment, pub_id, user_id, user_name)
        console.log(data)

        dispatch({
            type: 'FETCH_REVIEWS',
            payload: data,
        });
    } catch (e) {
        console.log(e)
    }
};

export const getAllReviews = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllReviews(id)
        console.log(data)

        dispatch({
            type: 'FETCH_REVIEWS',
            payload: data,
        });
    } catch (error) {
        console.log(error)
    }
};

export const deleteReviews = (pubId, reviewId) => async (dispatch) => {
    try {
        const { data } = await api.deleteReviews(pubId, reviewId)

        dispatch({type: 'FETCH_REVIEWS', payload: data});
    } catch (error) {
        console.log(error)
    }
};

export const newNews = (text, pub_id, user_id, user_name) => async (dispatch) => {
    try {
        const {data}  = await api.newNews(text, pub_id, user_id, user_name)
        console.log(data)

        dispatch({
            type: 'FETCH_NEWS',
            payload: data,
        });
    } catch (e) {
        console.log(e)
    }
};

export const getAllNews = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllNews(id)
        console.log(data)

        dispatch({
            type: 'FETCH_NEWS',
            payload: data,
        });
    } catch (error) {
        console.log(error)
    }
};

export const deleteNews = (pubId, newsId) => async (dispatch) => {
    try {
        const { data } = await api.deleteNews(pubId, newsId)

        dispatch({type: 'FETCH_NEWS', payload: data});
    } catch (error) {
        console.log(error)
    }
};

export const newShares = (text, pub_id, user_id, user_name) => async (dispatch) => {
    try {
        const {data}  = await api.newShares(text, pub_id, user_id, user_name)
        console.log(data)

        dispatch({
            type: 'FETCH_REVIEWS',
            payload: data,
        });
    } catch (e) {
        console.log(e)
    }
};

export const getAllShares = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllShares(id)
        console.log(data)

        dispatch({
            type: 'FETCH_SHARES',
            payload: data,
        });
    } catch (error) {
        console.log(error)
    }
};

export const deleteShares = (pubId, sharesId) => async (dispatch) => {
    try {
        const { data } = await api.deleteShares(pubId, sharesId)

        dispatch({type: 'FETCH_SHARES', payload: data});
    } catch (error) {
        console.log(error)
    }
};

export const newEvents = (rating, comment, pub_id, user_id, user_name) => async (dispatch) => {
    try {
        const {data}  = await api.newReview(rating, comment, pub_id, user_id, user_name)
        console.log(data)

        dispatch({
            type: 'FETCH_REVIEWS',
            payload: data,
        });
    } catch (e) {
        console.log(e)
    }
};

export const getAllEvents = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllEvents(id)
        console.log(data)

        dispatch({
            type: 'FETCH_EVENTS',
            payload: data,
        });
    } catch (error) {
        console.log(error)
    }
};

export const deleteEvents = (pubId, eventsId) => async (dispatch) => {
    try {
        const { data } = await api.deleteEvents(pubId, eventsId)

        dispatch({type: 'FETCH_EVENTS', payload: data});
    } catch (error) {
        console.log(error)
    }
};
