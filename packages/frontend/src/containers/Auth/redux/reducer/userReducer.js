import {
  GET_USER_SUCCESS,
  CLEAR_USER_STATE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  USER_REQUEST_PENDING
} from "../actions/actionTypes";

const initialState = {
  registerError: null,
  loginError: null,
  user: null,
  isLoading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...initialState, user: action.user };
    case USER_REQUEST_PENDING:
      return { ...initialState, isLoading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, isLoading: false };
    case REGISTER_USER_FAILURE:
      return { ...initialState, registerError: action.error };
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.user };
    case LOGIN_USER_FAILURE:
      return { ...initialState, loginError: action.error };
    case CLEAR_USER_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
