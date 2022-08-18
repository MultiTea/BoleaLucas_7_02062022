import * as PostApi from '../api/PostRequest';

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'RETREIVING_START' });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: 'RETREIVING_SUCCESS', data: data });
  } catch (error) {
    dispatch({ type: 'RETREIVING_FAIL' });
    console.log(error);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await PostApi.likePost(id, { userId: user.user._id });
    dispatch({ type: 'LIKE_POST', data: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id) => async (dispatch) => {
  dispatch({ type: 'UPDATE_POST_START' });
  try {
    const { data } = await PostApi.updatePost(id);
    dispatch({ type: 'UPDATE_POST_SUCCESS', data: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_POST_FAIL' });
  }
};

export const deletePost = (id, data) => async (dispatch) => {
  dispatch({ type: 'DELETE_POST_START' });
  PostApi.deletePost(id, data);
};
