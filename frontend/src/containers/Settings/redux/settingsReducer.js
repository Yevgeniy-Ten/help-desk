import {
    SETTING_CREATE_COMPANY_SUCCESS, SETTING_CREATE_DEPARTMENT_SUCCESS,
    SETTING_CREATE_REGLAMENT_SUCCESS, SETTING_CREATE_TOPIC_SUCCESS,
    SETTING_REQUEST_COMPANIES, SETTING_REQUEST_DEPARTMENTS,
    SETTING_REQUEST_ERROR, SETTING_REQUEST_REGLAMENTS,
    SETTING_REQUEST_STARTED,
    SETTING_REQUEST_TOPICS
} from "./settingsTypes";

const initialState = {
    topics: [],
    reglaments: [],
    companies: [],
    departments: [],
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
        case SETTING_REQUEST_DEPARTMENTS:
            return {...state, isLoading: false, departments: action.departments}
        case SETTING_CREATE_REGLAMENT_SUCCESS:
            return {...state, isLoading: false}
        case SETTING_CREATE_COMPANY_SUCCESS:
            return {...state, isLoading: false}
        case SETTING_CREATE_DEPARTMENT_SUCCESS:
            return {...state, isLoading: false}
        case SETTING_CREATE_TOPIC_SUCCESS:
            return {...state, isLoading: false}
        default:
            return state
    }
}
export default settingsReducer