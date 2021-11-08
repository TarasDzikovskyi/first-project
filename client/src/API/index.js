import axios from 'axios';


const API = axios.create({baseURL: 'http://localhost:5000'})
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile'))}`
    }
    return req
})

export const fetchPub = (id) => API.get(`/pubs/${id}`)
export const fetchPubs = (page) => API.get(`/pubs?page=${page}`)
export const fetchPubsBySearch = (searchQuery) => API.get(`/pubs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPub = (newPub) => API.post('/pubs', newPub);
export const updatePub = (id, updatedPub) => API.patch(`/pubs/${id}`, updatedPub)
export const likePub = (id) => API.patch(`/pubs/${id}/likePub`);
export const comment = (value, id) => API.post(`/pubs/${id}/commentPub`, {value});
export const deletePub = (id) => API.delete(`/pubs/${id}`)


export const signIn = (email, password) => API.post('/auth/login', {email, password})
export const signUp = (name, email, born_year, password) => API.post('/auth/register', {email, password})
