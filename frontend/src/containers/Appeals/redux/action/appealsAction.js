import {
    GET_APPEALS,
    GET_APPEAL,
    APPEALS_REQUEST_PENDING,
    APPEALS_SUCCESS,
    APPEALS_ERROR,
    SELECTED_APPEALS
} from "./appealsActionType";
import { push } from "connected-react-router";

export const getAppeals = (value) => ({ type: GET_APPEALS, value });
export const getAppeal = (value) => ({ type: GET_APPEAL, value });

export const appealsRequest = () => ({ type: APPEALS_REQUEST_PENDING });
export const appealsSuccess = () => ({ type: APPEALS_SUCCESS });
export const appealsError = (error) => ({ type: APPEALS_ERROR, error });

export const saveSelectedAppeals = (values) => ({ type: SELECTED_APPEALS, values });

export const fetchAppeals = () => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequest());
            const response = await axios.get('/appeals');
            if (response.data !== null) {
                dispatch(getAppeals(response.data));
                dispatch(appealsSuccess());
            }
        } catch (err) {
            dispatch(appealsError(err));
        }
    }
};

export const fetchAppeal = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequest());
            const response = await axios.get(`/appeals/${id}`);
            if (response.data !== null) {
                dispatch(getAppeal(response.data));
                dispatch(appealsSuccess());
            }
        } catch (err) {
            dispatch(appealsError(err));
        }
    }
};

export const addNewAppeals = (dataCopy) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequest());
            await axios.post('/appeals', dataCopy);
            dispatch(appealsSuccess());
            dispatch(push("/appeals"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(appealsError(e.response.data));
            } else {
                dispatch(appealsError({ global: 'No internet' }));
            }
        }
    }
};

export const putAppeals = (id, dataCopy) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealsRequest());
            await axios.put(`/appeals/${id}`, dataCopy);
            dispatch(appealsSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(appealsError(e.response.data));
            } else {
                dispatch(appealsError({ global: 'No internet' }));
            }
        }
    }
};
