import {
    APPEALS_GET_SUCCESS,
    APPEALS_REQUEST_ERROR,
    APPEALS_REQUEST_STARTED
} from "./appealsActionType";
import {push} from "connected-react-router";

export const appealsRequestStarted = () => ({type: APPEALS_REQUEST_STARTED});
export const appealsRequestError = (errors) => ({type: APPEALS_REQUEST_ERROR, errors});
export const appealsGetSuccess = (appeals) => ({type: APPEALS_GET_SUCCESS, appeals});

export const fetchAppeals = () => {
    return async (dispatch, _, axios) => {
        dispatch(appealsRequestStarted());
        try {
            const response = await axios.get("/appeals");
            dispatch(appealsGetSuccess(response.data))
            dispatch(push("/appeals"))
        } catch (err) {
            dispatch(appealsRequestError());
        }
    }
};
