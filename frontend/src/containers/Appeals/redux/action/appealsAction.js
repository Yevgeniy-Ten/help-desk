import {
    APPEALS_FILTER_SUCCESS,
    APPEALS_GET_SUCCESS,
    APPEALS_REQUEST_ERROR,
    APPEALS_REQUEST_STARTED
} from "./appealsActionType";
import {push} from "connected-react-router";

const appealsRequestStarted = () => ({type: APPEALS_REQUEST_STARTED});
const appealsRequestError = (errors) => ({type: APPEALS_REQUEST_ERROR, errors});
const appealsGetSuccess = (appeals) => ({type: APPEALS_GET_SUCCESS, appeals});
const appealFilterSuccess = (appeals) => ({type: APPEALS_FILTER_SUCCESS, appeals})

export const fetchAppeals = () => {
    return async (dispatch, _, axios) => {
        dispatch(appealsRequestStarted());
        try {
            const response = await axios.get("/appeals");
            dispatch(appealsGetSuccess(response.data))
            dispatch(push("/appeals"))
        } catch (err) {
            dispatch(appealsRequestError(err));
        }
    }
};

export const fetchAppealFilters = (params) => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.get("/appeals", {params})
            // приходят филтрованные поля
            dispatch(appealFilterSuccess(response.data))
        } catch (err) {
            dispatch(appealsRequestError(err));
        }
    }
}
