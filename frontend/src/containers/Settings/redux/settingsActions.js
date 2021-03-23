import {
    SETTING_CREATE_COMPANY_SUCCESS, SETTING_CREATE_DEPARTMENT_SUCCESS, SETTING_CREATE_REGLAMENT_SUCCESS,
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
export const settingsRequestDepartments = (departments) =>
    ({type: SETTING_CREATE_DEPARTMENT_SUCCESS, departments})
export const settingsRequestCompanies = (companies) => ({type: SETTING_REQUEST_COMPANIES, companies})
export const createTopicSuccess = () => ({type: SETTING_CREATE_COMPANY_SUCCESS})
export const createDepartmentSuccess = () => ({type: SETTING_CREATE_DEPARTMENT_SUCCESS})
export const createCompanySuccess = () => ({type: SETTING_CREATE_COMPANY_SUCCESS})
export const createReglamentSuccess = () => ({type: SETTING_CREATE_REGLAMENT_SUCCESS})
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
            const response = await axios.get("/rules");
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
export const fetchDepartments = () => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.get("/departments");
            dispatch(settingsRequestDepartments(response.data))
        } catch {
            //  департментов нет)
        }
    }
};
export const fetchCompanyCreate = (company) => {
    return async (dispatch, _, axios) => {
        try {
            axios.post("/companies", company)
            dispatch(createCompanySuccess())
            dispatch(fetchCompanies())
        } catch (errors) {
            dispatch(settingsRequestError(errors))
        }
    }
}
export const fetchDepartmentCreate = (department) => {
    return async (dispatch, _, axios) => {
        try {
            axios.post("/departments", department)
            dispatch(createDepartmentSuccess())
            dispatch(fetchDepartments())
        } catch (errors) {
            dispatch(settingsRequestError(errors))
        }
    }
}
export const fetchReglamentCreate = (reglament) => {
    return async (dispatch, _, axios) => {
        try {
            axios.post("/rules", reglament)
            dispatch(fetchReglaments())
        } catch (errors) {
            dispatch(settingsRequestError(errors))
        }
    }
}
export const fetchTopicCreate = (topic) => {
    return async (dispatch, _, axios) => {
        try {
            axios.post("/topics", topic)
            dispatch(createTopicSuccess())
            dispatch(fetchTopics())
        } catch (errors) {
            dispatch(settingsRequestError(errors))
        }
    }
}