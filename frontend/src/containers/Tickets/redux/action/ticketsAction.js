import { push } from 'connected-react-router';
import {
    GET_TICKETS,
    TICKETS_REQUEST_PENDING,
    TICKETS_SUCCESS,
    TICKETS_ERROR,
} from "./ticketsActionType";

export const getTickets = (values) => ({ type: GET_TICKETS, values });

export const ticketsRequest = () => ({ type: TICKETS_REQUEST_PENDING });
export const ticketsSuccess = () => ({ type: TICKETS_SUCCESS });
export const ticketsError = (error) => ({ type: TICKETS_ERROR, error });

export const fetchTickets = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(ticketsRequest());
            const response = await axios.get('/tickets');
            if (response.data !== null) {
                dispatch(getTickets(response.data));
                dispatch(ticketsSuccess());
            }
        } catch (err) {
            dispatch(ticketsError(err));
        }
    }
};

export const addNewTickets = (dataCopy) => {
    return async (dispatch, _, axios) => {
        console.log(dataCopy);
        try {
            dispatch(ticketsRequest());
            await axios.post('/tickets', dataCopy);
            dispatch(ticketsSuccess());
            setTimeout(() => {
                dispatch(push('/'));
            }, 2000)
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(ticketsError(e.response.data));
            } else {
                dispatch(ticketsError({ global: 'Проверьте соединение' }));
            }
        }
    }
};

export const putTickets = (id, dataCopy) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(ticketsRequest());
            await axios.put(`/tickets/${id}`, dataCopy);
            dispatch(ticketsSuccess());
            dispatch(push('/'));
        } catch (err) {
            dispatch(ticketsError(err));
        }
    }
};

export const deleteTickets = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(ticketsRequest());
            await axios.get(`/tickets/${id}`);
            dispatch(ticketsSuccess());
            dispatch(push('/'));
        } catch (err) {
            dispatch(ticketsError(err));
        }
    }
};
