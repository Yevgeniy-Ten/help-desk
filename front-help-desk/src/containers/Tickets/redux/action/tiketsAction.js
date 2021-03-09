import { push } from 'connected-react-router';
import {
    GET_TIKETS,
    TIKETS_REQUEST_PENDING,
    TIKETS_SUCCESS,
    TIKETS_ERROR,
} from "./tiketsActionType";

export const getTikets = (value) => ({ type: GET_TIKETS, value });

export const tiketsRequest = () => ({ type: TIKETS_REQUEST_PENDING });
export const tiketsSuccess = () => ({ type: TIKETS_SUCCESS });
export const tiketsError = (error) => ({ type: TIKETS_ERROR, error });

export const fetchTikets = (id) => {
    return async (dispatch, _, axios) => {
        try {
            let urlAppeal = '/tikets';
            if (id) {
                urlAppeal = `/tikets?idAppeal=${id}`;
            }
            dispatch(tiketsRequest());
            const response = await axios.get(urlAppeal);
            if (response.data !== null) {
                dispatch(getAppeals(response.data));
                dispatch(tiketsSuccess());
            }
        } catch (err) {
            dispatch(tiketsError(err));
        }
    }
};

export const addNewTikets = (dataCopy) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(tiketsRequest());
            await axios.post('/tikets', dataCopy);
            dispatch(tiketsSuccess());
            setTimeout(() => {
                dispatch(push('/'));
            }, 2000)
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(tiketsError(e.response.data));
            } else {
                dispatch(tiketsError({ global: 'Проверьте соединение' }));
            }
        }
    }
};

export const putTikets = (id, dataCopy) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(tiketsRequest());
            await axios.put(`/tikets/${id}`, dataCopy);
            dispatch(tiketsSuccess());
            dispatch(push('/'));
        } catch (err) {
            dispatch(tiketsError(err));
        }
    }
};

export const deleteTikets = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(tiketsRequest());
            await axios.get(`/tikets/${id}`);
            dispatch(tiketsSuccess());
            dispatch(push('/'));
        } catch (err) {
            dispatch(tiketsError(err));
        }
    }
};
