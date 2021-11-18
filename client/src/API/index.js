import axios from 'axios';


const API = axios.create({baseURL: 'https://localhost:5000'})
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile'))}`
//     }
//     return req
// })


export const fetchPub = (id) => API.get(`/pubs/${id}`)
export const fetchPubs = (page) => API.get(`/pubs?page=${page}`)
export const fetchAllPubs = () => API.get(`/admin/pubs`)
export const fetchAllUsers = (page) => API.get(`/admin/users?page=${page}`)
export const fetchPubsBySearch = (searchQuery) => API.get(`/pubs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPub = (newPub) => API.post('/pubs', newPub);
export const updatePub = (id, updatedPub) => API.patch(`/pubs/${id}`, updatedPub);
export const likePub = (id) => API.patch(`/pubs/${id}/likePub`);
export const comment = (value, id) => API.post(`/pubs/${id}/commentPub`, {value});
export const deletePub = (id) => API.delete(`/pubs/${id}`);

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const createUser = (newUser) => API.post('/users', newUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
