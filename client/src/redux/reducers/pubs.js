export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                pubs: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case 'FETCH_BY_SEARCH':
            return {...state, pubs: action.payload.data};
        case 'DELETE':
            return state.filter((pub) => pub._id !== action.payload);
        case 'CREATE':
            return [...state, action.payload];
        case 'UPDATE':
        case 'LIKE':
            return state.map((pub) => pub._id === action.payload._id ? action.payload: pub)
        default:
            return state
    }
}
