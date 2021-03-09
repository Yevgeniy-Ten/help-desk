import {
    GET_APPEALS,
    APPEALS_REQUEST_PENDING,
    APPEALS_SUCCESS,
    APPEALS_ERROR,
} from "../action/appealsActionType";

const initState = {
    appealsList: [],
    loading: false,
    error: null,
}

const appealsReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEALS_REQUEST_PENDING:
            return { ...state, loading: true };
        case APPEALS_SUCCESS:
            return { ...state, loading: false, error: null };
        case APPEALS_ERROR:
            return { ...state, loading: false, error: action.error };
        case GET_APPEALS:
            return { ...state, appealsList: action.value };
        default:
            return state;
    }
}

export default appealsReducer;