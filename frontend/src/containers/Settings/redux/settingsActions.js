import {
    SETTING_REQUEST_COMPANIES,
    SETTING_REQUEST_ERROR,
    SETTING_REQUEST_REGLAMENTS,
    SETTING_REQUEST_STARTED,
    SETTING_REQUEST_TOPICS
} from "./settingsTypes";


export const settingsRequestStart = () => ({type: SETTING_REQUEST_STARTED})
export const settingsRequestError = (errors) => ({type: SETTING_REQUEST_ERROR, errors})
export const settingsRequestTopics = (topics) => ({type: SETTING_REQUEST_TOPICS, topics})
export const settingsRequestReglaments = (reglaments) => ({type: SETTING_REQUEST_REGLAMENTS, reglaments})
export const settingsRequestCompanies = (companies) => ({type: SETTING_REQUEST_COMPANIES, companies})


// для получения тематик
export const fetchTopics = () => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.get("/topics");
            dispatch(settingsRequestTopics(response.data))
        } catch {
            // топиков нет)
        }
    }
};
export const fetchReglaments = () => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.get("/reglaments");
            dispatch(settingsRequestReglaments(response.data))
        } catch {
            // топиков нет)
        }
    }
};
export const fetchCompanies = () => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.get("/companies");
            dispatch(settingsRequestCompanies(response.data))
        } catch {
            // топиков нет)
        }
    }
};

