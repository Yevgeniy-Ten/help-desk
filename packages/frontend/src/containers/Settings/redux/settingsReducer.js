import {
    SETTING_REQUEST_COMPANIES,
    SETTING_REQUEST_DEPARTMENTS,
    SETTING_REQUEST_ERROR,
    SETTING_REQUEST_REGLAMENTS,
    SETTING_REQUEST_STARTED,
    SETTING_REQUEST_TOPICS,
    SETTING_REQUEST_POSITIONS,
    SETTING_SET_EDITABLE_ELEMENT,
    CLEAR_EDITABLE_ELEMENT,
    SETTING_REQUEST_FINISHED,
    SETTING_ORGSTRUCTURE_SUCCESS
} from "./settingsTypes";

const initialState = {
    orgStructures: [],
    topics: [],
    reglaments: [],
    companies: [],
    departments: [],
    positions: [],
    isLoading: false,
    errors: null,
    editableSetting: null
}


export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETTING_REQUEST_STARTED:
            return {...state, isLoading: true}
        case SETTING_REQUEST_ERROR:
            return {...initialState, errors: action.errors ? action.errors : null}
        case SETTING_REQUEST_FINISHED:
            return {...state, isLoading: false}
        case SETTING_REQUEST_TOPICS:
            return {...state, topics: action.topics}
        case SETTING_REQUEST_COMPANIES:
            return {...state, companies: action.companies}
        case SETTING_ORGSTRUCTURE_SUCCESS:
            return {...state, orgStructures: action.orgstructures}
        case SETTING_REQUEST_REGLAMENTS:
            return {...state, reglaments: action.reglaments}
        case SETTING_REQUEST_DEPARTMENTS:
            return {...state, departments: action.departments}
        case SETTING_REQUEST_POSITIONS:
            return {...state, positions: action.positions}
        case SETTING_SET_EDITABLE_ELEMENT:
            return {...state, editableSetting: action.element}
        case CLEAR_EDITABLE_ELEMENT:
            return {...state, editableSetting: null}
        default:
            return state
    }
}
export default settingsReducer