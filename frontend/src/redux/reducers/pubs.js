
export default (pubs = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
            ;
        case 'CREATE':
            return [...pubs, action.payload];
        default:
            return pubs
    }
}
