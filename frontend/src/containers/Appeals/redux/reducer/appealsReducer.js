import {
    GET_APPEALS,
    GET_APPEAL,
    APPEALS_REQUEST_PENDING,
    APPEALS_SUCCESS,
    APPEALS_ERROR,
    SELECTED_APPEALS
} from "../action/appealsActionType";

const initState = {
    appeals: [],
    appeal: {},
    loading: false,
    error: null,
}

const appealsReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEALS_REQUEST_PENDING:
            return {...state, loading: true};
        case APPEALS_SUCCESS:
            return {...state, loading: false, error: null};
        case APPEALS_ERROR:
            return {...state, loading: false, error: action.error};
        case GET_APPEALS:
            return {...state, appeals: action.value};
        case GET_APPEAL:
            return {...state, appeal: action.value};
        case SELECTED_APPEALS:
            return {...state, appeals: action.values};
        default:
            return state;
    }
}

export default appealsReducer;