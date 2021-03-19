import {
    APPEALS_REQUEST_ERROR,
    APPEALS_REQUEST_PENDING, APPEALS_REQUEST_SUCCESS,
    SAVE_SELECTED_APPEALS, SET_APPEALS, SET_APPEAL
} from "../action/appealsActionType";

const initState = {
    appeals: [],
    appeal: {},
    selectedAppeals: [],
    loading: false,
    error: null,
}

const appealsReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEALS_REQUEST_PENDING:
            return {...state, loading: true, error: null};
        case APPEALS_REQUEST_SUCCESS:
            return {...state, loading: false, error: null};
        case APPEALS_REQUEST_ERROR:
            return {...state, loading: false, error: action.error};
        case SET_APPEALS:
            return {...state, appeals: action.appeals};
        case SET_APPEAL:
            return {...state, appeal: action.appeal};
        case SAVE_SELECTED_APPEALS:
            return {...state, appeals: action.selectedAppeals};
        default:
            return state;
    }
}

export default appealsReducer;