import { LOG_GET_SUCCESS, LOG_GET_ERROR, LOG_GET_STARTED } from "./logType";

const initState = {
  logs: [],
  loading: false,
  error: null
};

const logReducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_GET_ERROR:
      return { ...initState, loading: false, error: action.errors };
    case LOG_GET_SUCCESS:
      return { ...initState, loading: false, logs: action.logs };
    case LOG_GET_STARTED:
      return { ...initState, loading: true };
    default:
      return state;
  }
};

export default logReducer;
