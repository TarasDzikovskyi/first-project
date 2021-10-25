import axios from 'axios';

const url = 'http://localhost:5000/pubs';

export const fetchPubs = () => axios.get(url)
export const createPub = (newPub) => axios.post(url, newPub)
