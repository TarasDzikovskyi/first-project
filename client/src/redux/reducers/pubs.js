export default (state = {isLoading: true, pubs: [], reviews: [], news: [], shares: [], events: []}, action) => {
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
        case 'FETCH_ALL_BY_ADMIN':
            return {
                ...state,
                pubs: action.payload.data,
                currentOfPubPage: action.payload.currentOfPubPage,
                numberOfPubPages: action.payload.numberOfPubPages
            };
        case 'FETCH_NOT_ACTIVATED':
            return {...state, pubs: action.payload};
        case 'FETCH_PUBS_BY_ADMIN':
            return {...state, pubs: action.payload};
        case 'FETCH_PUB':
            return {...state, pub: action.payload.pub};
        case 'FETCH_BY_SEARCH':
            return {...state, pubs: action.payload};
        case 'FETCH_REVIEWS':
            return {...state, reviews: action.payload};
        case 'FETCH_NEWS':
            return {...state, news: action.payload};
        case 'DELETE':
            return {...state, pubs: state.pubs.filter((pub) => pub._id !== action.payload)};
        case 'CREATE':
            return {...state, pubs: [...state.pubs, action.payload]};
        case 'UPDATE':
            return {...state, pubs: state.pubs.map((pub) => (pub._id === action.payload._id ? action.payload : pub))}
        case 'ACTIVATE':
            return {...state, pubs: state.pubs.map((pub) => (pub._id === action.payload._id ? action.payload : pub))}
        default:
            return state
    }
}
