import { LOG_GET_SUCCESS, LOG_GET_ERROR, LOG_GET_STARTED } from "./logType";

const logStarted = () => {
  return { type: LOG_GET_STARTED };
};
const logError = (errors) => {
  return { type: LOG_GET_ERROR, errors };
};
const logGetSuccess = (logs) => {
  return { type: LOG_GET_SUCCESS, logs };
};

export const fetchLogs = () => {
  return async (dispatch, _, axios) => {
    dispatch(logStarted());
    try {
      const response = await axios.get("/logs");
      dispatch(logGetSuccess(response.data));
    } catch (err) {
      dispatch(logError(err));
    }
  };
};
