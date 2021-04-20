import {
  HISTORY_GET_SUCCESS,
  HISTORY_REQUEST_ERROR,
  HISTORY_REQUEST_STARTED
} from "./historyType";

const historyStarted = () => {
  return { type: HISTORY_REQUEST_STARTED };
};
const historyError = (errors) => {
  return { type: HISTORY_REQUEST_ERROR, errors };
};
const historyGetSuccess = (history) => {
  return { type: HISTORY_GET_SUCCESS, history };
};

export const fetchHistory = (queryParams) => {
  return async (dispatch, _, axios) => {
    dispatch(historyStarted());
    try {
      const response = await axios.get("/requests/history", {
        params: {
          ...queryParams
        }
      });
      dispatch(historyGetSuccess(response.data));
    } catch (err) {
      dispatch(historyError(err));
    }
  };
};
