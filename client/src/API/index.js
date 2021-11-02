import axios from 'axios';


const API = axios.create({baseURL: 'http://localhost:5000'})
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))}`
    }
})

export const fetchPubs = (page) => API.get(`/pubs?page=${page}`)
export const fetchPubsBySearch = (searchQuery) => API.get(`/pubs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPub = (newPub) => API.post('/pubs', newPub);
export const updatePub = (id, updatedPub) => API.patch(`/pubs/${id}`, updatedPub)
export const likePub = (id) => API.patch(`/pubs/${id}/likePub`);
export const deletePub = (id) => API.delete(`/pubs/${id}`)

export const signIn = (email, password) => API.post('/auth/login', {email, password})
export const signUp = (formData) => API.post('/auth/register', formData)
