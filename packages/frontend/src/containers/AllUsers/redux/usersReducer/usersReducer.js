import {
  AXIOS_AUTHORIZE_USER_ERROR,
  AXIOS_AUTHORIZE_USER_PENDING,
  AXIOS_DELETE_USER_ERROR,
  AXIOS_DELETE_USER_PENDING,
  AXIOS_USERS_ERROR,
  AXIOS_USERS_PENDING,
  AXIOS_USERS_SUCCESS,
  AXIOS_USER_ERROR,
  AXIOS_USER_PENDING,
  AXIOS_USER_SUCCESS
} from "../usersAction/usersTypes";

const initialState = {
  users: [],
  isLoading: false,
  userForUpdate: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case AXIOS_USER_PENDING:
      return { ...state, isLoading: true };
    case AXIOS_USER_ERROR:
      return { ...state, isLoading: false };
    case AXIOS_USER_SUCCESS:
      return { ...state, isLoading: false, userForUpdate: action.user };
    case AXIOS_USERS_ERROR:
      return { ...state, isLoading: false };
    case AXIOS_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.users };
    case AXIOS_USERS_PENDING:
      return { ...state, isLoading: true };
    case AXIOS_AUTHORIZE_USER_PENDING:
      return { ...state, isLoading: true };
    case AXIOS_AUTHORIZE_USER_ERROR:
      return { ...state, isLoading: false };
    case AXIOS_DELETE_USER_ERROR:
      return { ...state, isLoading: false };
    case AXIOS_DELETE_USER_PENDING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default usersReducer;
