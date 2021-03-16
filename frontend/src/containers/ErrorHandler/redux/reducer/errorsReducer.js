import {
  CLEAR_ALL_ERRORS,
  LOGIN_FAILED,
  REGISTER_FAILED,
} from "../action/errorsActionType";

const initState = {
  errorLogin: null,
  errorRegister: null,
};

const errorsReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_FAILED:
      return { ...state, errorRegister: action.err };
    case LOGIN_FAILED:
      return { ...state, errorLogin: action.err };
    case CLEAR_ALL_ERRORS:
      return { ...initState };
    default:
      return state;
  }
};

export default errorsReducer;
