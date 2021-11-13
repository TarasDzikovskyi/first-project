export default (state = {isLoading: true, users: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true}
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'UPDATE_USER':
            return {...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user))}
        default:
            return state
    }
}
