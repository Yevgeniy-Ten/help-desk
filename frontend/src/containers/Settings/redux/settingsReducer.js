import {
    SETTING_REQUEST_COMPANIES,
    SETTING_REQUEST_ERROR, SETTING_REQUEST_REGLAMENTS,
    SETTING_REQUEST_STARTED,
    SETTING_REQUEST_TOPICS
} from "./settingsTypes";

const initialState = {
    topics: [],
    reglaments: [],
    companies: [],
    isLoading: false,
    errors: null
}


export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETTING_REQUEST_STARTED:
            return {...state, isLoading: true}
        case SETTING_REQUEST_ERROR:
            return {...initialState}
        case SETTING_REQUEST_TOPICS:
            return {...state, isLoading: false, topics: action.topics}
        case SETTING_REQUEST_COMPANIES:
            return {...state, isLoading: false, companies: action.companies}
        case SETTING_REQUEST_REGLAMENTS:
            return {...state, isLoading: false, reglaments: action.reglaments}
        default:
            return state
    }
}
export default settingsReducer