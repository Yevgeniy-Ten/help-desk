import {
    AUDIT_GET_SUCCESS, 
    AUDIT_REQUEST_ERROR, 
    AUDIT_REQUEST_STARTED
} from "./auditType";

const initState = {
    audit: [],
    loading: false,
    error: null,
}

const auditReducer = (state = initState, action) => {
    switch (action.type) {
        case AUDIT_REQUEST_ERROR:
            return {...initState, loading: false, error: action.errors}
        case AUDIT_GET_SUCCESS:
            return {...initState, audit: action.audit}
        case AUDIT_REQUEST_STARTED:
            return {...initState, loading: true}
        default:
            return state;
    }
}

export default auditReducer;