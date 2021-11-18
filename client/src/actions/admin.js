import * as api from "../API";


export const getUsersByAdmin = (page) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data: {data, currentUserPage, numberOfUserPages}} = await api.fetchAllUsers(page);
        console.log(data)

        dispatch({type: 'FETCH_ALL_USERS', payload: {data, currentUserPage, numberOfUserPages}});
        dispatch({type: 'END_LOADING'})
    } catch (e) {
        console.log(e.message);
    }
}

// export const getUsersByAdmin = () => async (dispatch) => {
//     try {
//         dispatch({type: 'START_LOADING'})
//         const {data} = await api.fetchAllUsers();
//         console.log(data)
//
//         dispatch({type: 'FETCH_ALL_USERS', payload: data});
//         dispatch({type: 'END_LOADING'})
//     } catch (e) {
//         console.log(e.message);
//     }
// }

export const updateUserByAdmin = (id, user) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, user);
        console.log(data)

        dispatch({type: 'UPDATE_USER', payload: data})
    } catch (e) {
        console.log(e)
    }
}

export const createUserByAdmin = (user) => async (dispatch) => {
    try {
        const {data} = await api.createUser(user);
        console.log(data)

        dispatch({type: 'CREATE_USER', payload: data})

    } catch (e) {
        console.log(e)
    }
}

export const deleteUserByAdmin = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id)

        dispatch({type: 'DELETE_USER', payload: id})
    } catch (e) {
        console.log(e)
    }
}
