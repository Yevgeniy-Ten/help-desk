import {
    GET_APPEALS,
    APPEALS_REQUEST_PENDING,
    APPEALS_SUCCESS,
    APPEALS_ERROR,
} from "./appealsActionType";

export const getAppeals = (value) => ({ type: GET_APPEALS, value });

export const appealsRequest = () => ({ type: APPEALS_REQUEST_PENDING });
export const appealsSuccess = () => ({ type: APPEALS_SUCCESS });
export const appealsError = (error) => ({ type: APPEALS_ERROR, error });

export const fetchAppeals = (id) => {
    return async (dispatch, _, axios) => {
        try {
            let urlAppeal = '/appeals';
            if (id) {
                urlAppeal = `/appeals?idAppeal=${id}`;
            }
            dispatch(appealsRequest());
            const response = await axios.get(urlAppeal);
            if (response.data !== null) {
                dispatch(getAppeals(response.data));
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
