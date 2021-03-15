import {
    GET_TICKETS,
    TICKETS_REQUEST_PENDING,
    TICKETS_SUCCESS,
    TICKETS_ERROR,
} from "../action/ticketsActionType";

const initState = {
    tickets: [],
    loading: false,
    error: null,
}

const ticketsReducer = (state = initState, action) => {
    switch (action.type) {
        case TICKETS_REQUEST_PENDING:
            return { ...state, loading: true };
        case TICKETS_SUCCESS:
            return { ...state, loading: false, error: null };
        case TICKETS_ERROR:
            return { ...state, loading: false, error: action.error };
        case GET_TICKETS:
            return { ...state, tickets: action.values };
        default:
            return state;
    }
}

export default ticketsReducer;