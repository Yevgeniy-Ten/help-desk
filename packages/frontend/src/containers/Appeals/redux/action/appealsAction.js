import {
  APPEALS_FILTER_SUCCESS,
  APPEALS_GET_SUCCESS,
  APPEALS_REQUEST_ERROR,
  APPEALS_REQUEST_STARTED
} from "./appealsActionType";
import { push } from "connected-react-router";

const appealsRequestStarted = () => {
  return { type: APPEALS_REQUEST_STARTED };
};
const appealsRequestError = (errors) => {
  return {
    type: APPEALS_REQUEST_ERROR,
    errors
  };
};
const appealsGetSuccess = (appeals) => {
  return { type: APPEALS_GET_SUCCESS, appeals };
};
const appealFilterSuccess = (appeals) => {
  return {
    type: APPEALS_FILTER_SUCCESS,
    appeals
  };
};

export const fetchAppeals = () => {
  return async (dispatch, _, axios) => {
    dispatch(appealsRequestStarted());
    try {
      const response = await axios.get("/requests");
      dispatch(appealsGetSuccess(response.data));
      dispatch(push("/appeals"));
    } catch (err) {
      dispatch(appealsRequestError(err));
    }
  };
};

export const fetchAppealFilters = (params) => {
  return async (dispatch, _, axios) => {
    dispatch(appealsRequestStarted());
    try {
      const response = await axios.get("/requests", { params });
      // приходят филтрованные поля
      dispatch(appealFilterSuccess(response.data));
    } catch (err) {
      dispatch(appealsRequestError(err));
    }
  };
};
