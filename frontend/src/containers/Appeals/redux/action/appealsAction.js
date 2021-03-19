import {
    APPEALS_REQUEST_ERROR,
    APPEALS_REQUEST_PENDING,
    APPEALS_REQUEST_SUCCESS,
    SAVE_SELECTED_APPEALS,
    SET_APPEAL,
    SET_APPEALS
} from "./appealsActionType";
import {push} from "connected-react-router";

export const appealsRequestPending = () => ({type: APPEALS_REQUEST_PENDING});
export const appealsRequestError = () => ({type: APPEALS_REQUEST_ERROR});
export const appealsRequestSuccess = () => ({type: APPEALS_REQUEST_SUCCESS});
export const setAppeals = (appeals) => ({type: SET_APPEALS, appeals})
export const setAppeal = (appeal) => ({type: SET_APPEAL, appeal});
export const saveSelectedAppeals = (selectedAppeals) => ({type: SAVE_SELECTED_APPEALS, selectedAppeals});

export const fetchAppeals = () => {
    return async (dispatch, _, axios) => {
        dispatch(appealsRequestPending());
        try {
            const response = await axios.get("/appeals");
            dispatch(setAppeals(response.data))
        } catch (err) {
            dispatch(appealsRequestError());
        }
    }
};

export const fetchAppeal = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequestPending());
            const response = await axios.get(`/appeals/${id}`);
            dispatch(setAppeal(response.data))
            dispatch(appealsRequestSuccess())
        } catch (err) {
            dispatch(appealsRequestError());
        }
    }
};

export const addNewAppeals = (appealData) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequestPending());
            await axios.post("/appeals", appealData);
            dispatch(push("/appeals"));
            dispatch(appealsRequestSuccess())
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(appealsRequestError(e.response.data));
            } else {
                dispatch(appealsRequestError());
            }
        }
    }
};

export const putAppeals = (id, appealData) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequestPending());
            await axios.put(`/appeals/${id}`, appealData);
            dispatch(appealsRequestSuccess())
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(appealsRequestError(e.response.data));
            } else {
                dispatch(appealsRequestError());
            }
        }
    }
};
