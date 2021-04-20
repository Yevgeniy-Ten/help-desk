import {
  HISTORY_GET_SUCCESS,
  HISTORY_REQUEST_ERROR,
  HISTORY_REQUEST_STARTED
} from "./historyType";

const initState = {
  history: [],
  loading: false,
  error: null
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
    case HISTORY_REQUEST_ERROR:
      return { ...initState, loading: false, error: action.errors };
    case HISTORY_GET_SUCCESS:
      return { ...initState, history: action.history };
    case HISTORY_REQUEST_STARTED:
      return { ...initState, loading: true };
    default:
      return state;
  }
};

export default historyReducer;
