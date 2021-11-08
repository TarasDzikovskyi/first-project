export default (state = {isLoading: true, pubs: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true}
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCH_ALL':
            return {
                ...state,
                pubs: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case 'FETCH_PUB':
            return {...state, pub: action.payload.pub};
        case 'FETCH_BY_SEARCH':
            return {...state, pubs: action.payload.data};
        case 'DELETE':
            return {...state, pubs: state.pubs.filter((pub) => pub._id !== action.payload)};
        case 'CREATE':
            return {...state, pubs: [...state.pubs, action.payload]};
        case 'UPDATE':
            return {...state, pubs: state.pubs.map((pub) => (pub._id === action.payload._id ? action.payload : pub))}
        case 'COMMENT':
            return {
                ...state,
                pubs: state.pubs.map((pub) => {
                    if (pub._id === action.payload._id) {
                        return action.payload
                    }
                    return pub
                })
            }
        case 'LIKE':
            return {...state, pubs: state.pubs.map((pub) => (pub._id === action.payload._id ? action.payload : pub))}
        default:
            return state
    }
}
