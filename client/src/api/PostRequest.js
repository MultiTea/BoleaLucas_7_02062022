import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getPost = (id) => API.get(`/post/${id}`);
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
export const updatePost = (id, isAdmin) =>
  API.put(`/post/${id}/`, { isAdmin: isAdmin });
export const deletePost = (id, isAdmin) =>
  API.delete(`/post/${id}`, { isAdmin: isAdmin });
