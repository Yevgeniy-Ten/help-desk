import {
    CLEAR_EDITABLE_ELEMENT,
    SETTING_DELETE_SUCCESS, SETTING_ORGSTRUCTURE_SUCCESS,
    SETTING_REQUEST_COMPANIES, SETTING_REQUEST_DEPARTMENTS,
    SETTING_REQUEST_ERROR, SETTING_REQUEST_FINISHED, SETTING_REQUEST_POSITIONS,
    SETTING_REQUEST_REGLAMENTS,
    SETTING_REQUEST_STARTED,
    SETTING_REQUEST_TOPICS,
    SETTING_SET_EDITABLE_ELEMENT
} from "./settingsTypes";
import {message} from "antd";

export const settingsRequestStart = () => ({type: SETTING_REQUEST_STARTED})
export const settingsRequestError = (errors) => ({type: SETTING_REQUEST_ERROR, errors})
export const settingRequestFinished = () => ({type: SETTING_REQUEST_FINISHED})
export const settingsRequestTopics = (topics) => ({type: SETTING_REQUEST_TOPICS, topics})
export const settingsRequestReglaments = (reglaments) => ({type: SETTING_REQUEST_REGLAMENTS, reglaments})
export const settingsRequestDepartments = (departments) => ({type: SETTING_REQUEST_DEPARTMENTS, departments})
export const settingsRequestCompanies = (companies) => ({type: SETTING_REQUEST_COMPANIES, companies})
export const settingsRequestPositions = (positions) => ({type: SETTING_REQUEST_POSITIONS, positions})
export const settingDeleteSuccess = () => ({type: SETTING_DELETE_SUCCESS})
export const setEditableSetting = (element) => ({type: SETTING_SET_EDITABLE_ELEMENT, element})
export const clearEditalbleElement = () => ({type: CLEAR_EDITABLE_ELEMENT})
export const settingRequestOrgStructure = (positions) => ({type: SETTING_ORGSTRUCTURE_SUCCESS, positions})

export const fetchSettings = (settingType, queryParams) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(settingsRequestStart())
            const response = await axios.get(`/${settingType}`, {
                params: {
                    ...queryParams
                }
            })
            if (settingType === "companies") {
                dispatch(settingsRequestCompanies(response.data))
            } else if (settingType === "departments") {
                dispatch(settingsRequestDepartments(response.data))
            } else if (settingType === "topics") {
                dispatch(settingsRequestTopics(response.data))
            } else if (settingType === "reglaments") {
                dispatch(settingsRequestReglaments(response.data))
            } else if (settingType === "orgstructure") {
                dispatch(settingRequestOrgStructure(response.data))
            } else if (settingType === "position") {
                dispatch(settingsRequestPositions(response.data))
            }
            dispatch(settingRequestFinished())
        } catch (e) {
            dispatch(settingsRequestError(e.response ? e.response.data : e.message))
        }
    }

}
export const fetchSettingCreate = (settingType, body) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(settingsRequestStart())
            await axios.post(`/${settingType}`, body)
            dispatch(fetchSettings(settingType))
            dispatch(settingRequestFinished())
            message.success({
                className: "message-custom",
                content: `${settingType} создана успешно!`
            })
        } catch (errors) {
            dispatch(settingsRequestError(errors))
        }
    }
}

export const fetchSettingDelete = (settingType, id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(settingsRequestStart())
            await axios.delete(`/${settingType}/${id}`)
            dispatch(settingRequestFinished())
            dispatch(fetchSettings(settingType))
        } catch (errors) {
            dispatch(settingsRequestError(errors))
        }
    }
}

export const fetchSettingUpdate = (settingType, record) => {
    return async (dispatch, getState, axios) => {
        try {
            const updatedSetting = {
                ...getState().settings.editableSetting,
                ...record
            }
            dispatch(settingsRequestStart())
            await axios.put(`${settingType}/${updatedSetting.id}`, updatedSetting)
            dispatch(clearEditalbleElement())
            dispatch(settingRequestFinished())
            dispatch(fetchSettings(settingType))
        } catch (errors) {
            console.log(errors)
            // dispatch(settingsRequestError(errors))
        }
    }
}