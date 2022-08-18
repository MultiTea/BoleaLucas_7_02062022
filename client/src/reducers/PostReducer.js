const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, error: false, uploading: true };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case 'UPLOAD_FAIL':
      return { ...state, uploading: false, error: true };

    case 'LIKE_POST':
      console.log('action.data', action.data);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.data._id) {
            return action.data;
          } else {
            return post;
          }
        }),
      };

    case 'RETREIVING_START':
      return { ...state, loading: true, error: false };
    case 'RETREIVING_SUCCESS':
      return { ...state, posts: action.data, loading: false, error: false };
    case 'RETREIVING_FAIL':
      return { ...state, loading: false, error: true };

    case 'UPDATE_POST_START':
      return { ...state, loading: true, error: false };
    case 'UPDATE_POST_SUCCESS':
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.data._id ? action.data : post
          ),
        ],
        loading: false,
        error: false,
      };
    case 'UPDATE_POST_FAIL':
      return { ...state, loading: false, error: true };

    case 'DELETE_POST':
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.id)],
        error: false,
      };

    default:
      return state;
  }
};

export default postReducer;
