import {
    HISTORY_GET_SUCCESS, 
    HISTORY_REQUEST_ERROR, 
    HISTORY_REQUEST_STARTED
} from "./historyType";

const historyStarted = () => ({type: HISTORY_REQUEST_STARTED});
const historyError = (errors) => ({type: HISTORY_REQUEST_ERROR, errors});
const historyGetSuccess = (history) => ({type: HISTORY_GET_SUCCESS, history});

export const fetchHistory = () => {
    return async (dispatch, _, axios) => {
        dispatch(historyStarted());
        try {
            const response = await axios.get("/requests/history");
            dispatch(historyGetSuccess(response.data))
        } catch (err) {
            dispatch(historyError(err));
        }
    }
};