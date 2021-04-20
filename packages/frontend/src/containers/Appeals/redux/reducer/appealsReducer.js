import {
  APPEALS_FILTER_SUCCESS,
  APPEALS_GET_SUCCESS,
  APPEALS_REQUEST_ERROR,
  APPEALS_REQUEST_STARTED
} from "../action/appealsActionType";

const initState = {
  appeals: [],
  loading: false,
  error: null
};

const appealsReducer = (state = initState, action) => {
  switch (action.type) {
    case APPEALS_REQUEST_ERROR:
      return { ...initState, loading: false, error: action.errors };
    case APPEALS_FILTER_SUCCESS:
      return { ...initState, appeals: action.appeals };
    case APPEALS_GET_SUCCESS:
      return { ...initState, appeals: action.appeals };
    case APPEALS_REQUEST_STARTED:
      return { ...initState, loading: true };
    default:
      return state;
  }
};

export default appealsReducer;
