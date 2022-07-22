import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

export const getAllUser = () => API.get('/user');

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const deleteUser = (id, isAdmin) => API.delete(`/user/${id}`, isAdmin);
