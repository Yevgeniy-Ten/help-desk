import {
    APPEAL_CREATE_SUCCESS,
    APPEAL_GET_SUCCESS,
    APPEAL_REQUEST_ERROR,
    APPEAL_REQUEST_STARTED,
    APPEAL_UPDATE_SUCCESS
} from "./action/appealsActionType";

const initialState = {
    isLoading: false,
    errors: null,
    appeal: null
}

const appealReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPEAL_CREATE_SUCCESS:
            return {...state, errors: null, isLoading: false}
        case APPEAL_UPDATE_SUCCESS:
            return {...state, errors: null, isLoading: false}
        case APPEAL_GET_SUCCESS:
            return {...state, errors: null, isLoading: false, appeal: action.appeal}
        case APPEAL_REQUEST_ERROR:
            return {...state, isLoading: false, errors: action.errors}
        case APPEAL_REQUEST_STARTED:
            return {...state, isLoading: true, errors: null}
        default:
            return state
    }
}
export default appealReducer