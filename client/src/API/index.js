import axios from 'axios';

const API = axios.create({baseURL: 'https://localhost:5000'})

export const fetchPub = (id) => API.get(`/pubs/${id}`)
export const fetchPubs = (page) => API.get(`/pubs?page=${page}`)
export const fetchAllPubsByAdmin = () => API.get('/admin/pubs/all')
export const fetchNotActivatedPubs = () => API.get(`/admin/pubs/filter`)
export const fetchAllPubs = (page) => API.get(`/admin/pubs?page=${page}`)
export const fetchPubsBySearch = (searchQuery) => API.get(`/pubs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPubsByOnlySearch = (searchQuery) => API.get(`/admin/pubs/search?searchQuery=${searchQuery.search || 'none'}`);
export const createPub = (newPub) => API.post('/pubs', newPub);
export const updatePub = (id, updatedPub) => API.patch(`/pubs/${id}`, updatedPub);
export const news = (value, id) => API.post(`/pubs/${id}/newsPub`, {value});
export const deletePub = (id) => API.delete(`/pubs/${id}`);
export const activatePub = (id) => API.patch(`/admin/activate/${id}`);



export const newReview = (rating, comment, pub_id, user_id, user_name) => API.post('/pubs/reviews', {rating, comment, pub_id, user_id, user_name})
export const getAllReviews = (id) => API.get(`/pubs/reviews/${id}`)
export const deleteReviews = (id, reviewId) => API.delete(`/pubs/reviews/${id}/${reviewId}`)

export const newNews = (text, pub_id, user_id, user_name) => API.post('/pubs/news', {text, pub_id, user_id, user_name})
export const getAllNews = (id) => API.get(`/pubs/news/${id}`)
export const deleteNews = (id, newsId) => API.delete(`/pubs/news/${id}/${newsId}`)

export const newShares = (text, pub_id, user_id, user_name) => API.post('/pubs/shares', {text, pub_id, user_id, user_name})
export const getAllShares = (id) => API.get(`/pubs/shares/${id}`)
export const deleteShares = (id, sharesId) => API.delete(`/pubs/shares/${id}/${sharesId}`)

export const newEvents = (text, pub_id, user_id, user_name) => API.post('/pubs/events', {text, pub_id, user_id, user_name})
export const getAllEvents = (id) => API.get(`/pubs/events/${id}`)
export const deleteEvents = (id, eventsId) => API.delete(`/pubs/events/${id}/${eventsId}`)






export const fetchUser = (id) => API.get(`/users/${id}`)
export const fetchAllUsers = (page) => API.get(`/admin/users?page=${page}`)
export const fetchUsers = () => API.get('/users')
export const fetchUsersBySearch = (searchQuery) => API.get(`/admin/users/search?searchQuery=${searchQuery.search || 'none'}`);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const createUser = (newUser) => API.post('/users', newUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);


export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);




