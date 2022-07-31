import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const getPost = (id) => API.get(`/post/${id}`);
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
export const updatePost = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_POST_START' });
    await API.put(`/post/${id}/`, data);
    dispatch({ type: 'UPDATE_POST_SUCCESS', data });
  } catch (error) {
    dispatch({ type: 'UPDATE_POST_FAIL' });
  }
};

export const deletePost = (id, data) => async (dispatch) => {
  try {
    API.delete(`/post/${id}`, data);
    dispatch({ type: 'DELETE_POST', id });
  } catch (error) {
    console.log(error);
  }
};
