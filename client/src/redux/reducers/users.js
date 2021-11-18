export default (state = {isLoading: true, users: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true}
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCH_ALL_USERS':
            return {
                ...state,
                users: action.payload.data,
                currentUserPage: action.payload.currentUserPage,
                numberOfUserPages: action.payload.numberOfUserPages
            };
        case 'FETCH_USER':
            return {...state, user: action.payload.user};
        case 'DELETE_USER':
            return {...state, users: state.users.filter((user) => user._id !== action.payload)};
        case 'CREATE_USER':
            return {...state, users: [...state.users, action.payload]};
        case 'UPDATE_USER':
            return {...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user))}
        default:
            return state
    }
}
