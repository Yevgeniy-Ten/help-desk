import {
    GET_TIKETS,
    TIKETS_REQUEST_PENDING,
    TIKETS_SUCCESS,
    TIKETS_ERROR,
} from "../action/tiketsActionType";

const initState = {
    tiketsList: [],
    loading: false,
    error: null,
}

const tiketsReducer = (state = initState, action) => {
    switch (action.type) {
        case TIKETS_REQUEST_PENDING:
            return { ...state, loading: true };
        case TIKETS_SUCCESS:
            return { ...state, loading: false, error: null };
        case TIKETS_ERROR:
            return { ...state, loading: false, error: action.error };
        case GET_TIKETS:
            return { ...state, tiketsList: action.value };
        default:
            return state;
    }
}

export default tiketsReducer;