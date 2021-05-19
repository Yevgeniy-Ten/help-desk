import {
  CLEAR_EDITABLE_ELEMENT,
  SETTING_DELETE_SUCCESS,
  SETTING_ORGSTRUCTURE_SUCCESS,
  SETTING_REQUEST_COMPANIES,
  SETTING_REQUEST_DEPARTMENTS,
  SETTING_REQUEST_ERROR,
  SETTING_REQUEST_FINISHED,
  SETTING_REQUEST_MAIL_MESSAGES,
  SETTING_REQUEST_POSITIONS,
  SETTING_REQUEST_REGLAMENTS,
  SETTING_REQUEST_STARTED,
  SETTING_REQUEST_TOPICS,
  SETTING_SET_EDITABLE_ELEMENT
} from "./settingsTypes";
import { message } from "antd";

export const settingsRequestStart = () => {
  return { type: SETTING_REQUEST_STARTED };
};
export const settingsRequestError = (errors) => {
  return {
    type: SETTING_REQUEST_ERROR,
    errors
  };
};
export const settingRequestFinished = () => {
  return {
    type: SETTING_REQUEST_FINISHED
  };
};
export const settingsRequestTopics = (topics) => {
  return {
    type: SETTING_REQUEST_TOPICS,
    topics
  };
};
export const settingsRequestReglaments = (reglaments) => {
  return {
    type: SETTING_REQUEST_REGLAMENTS,
    reglaments
  };
};
export const settingsRequestMailMessages = (mailMessages) => {
  return {
    type: SETTING_REQUEST_MAIL_MESSAGES,
    mailMessages
  };
};
export const settingsRequestDepartments = (departments) => {
  return {
    type: SETTING_REQUEST_DEPARTMENTS,
    departments
  };
};
export const settingsRequestCompanies = (companies) => {
  return {
    type: SETTING_REQUEST_COMPANIES,
    companies
  };
};
export const settingsRequestPositions = (positions) => {
  return {
    type: SETTING_REQUEST_POSITIONS,
    positions
  };
};
export const settingDeleteSuccess = () => {
  return { type: SETTING_DELETE_SUCCESS };
};
export const setEditableSetting = (type, settingId) => {
  return {
    type: SETTING_SET_EDITABLE_ELEMENT,
    payload: {
      type,
      settingId
    }
  };
};
export const clearEditalbleElement = () => {
  return { type: CLEAR_EDITABLE_ELEMENT };
};
export const settingRequestOrgStructure = (orgstructures) => {
  return {
    type: SETTING_ORGSTRUCTURE_SUCCESS,
    orgstructures
  };
};

export const fetchSettings = (settingType, queryParams) => {
  return async (dispatch, _, axios) => {
    try {
      dispatch(settingsRequestStart());
      const response = await axios.get(`/${settingType}`, {
        params: {
          ...queryParams
        }
      });
      if (settingType === "companies") {
        dispatch(settingsRequestCompanies(response.data));
      } else if (settingType === "departments") {
        dispatch(settingsRequestDepartments(response.data));
      } else if (settingType === "topics") {
        dispatch(settingsRequestTopics(response.data));
      } else if (settingType === "reglaments") {
        dispatch(settingsRequestReglaments(response.data));
      } else if (settingType === "orgstructure") {
        dispatch(settingRequestOrgStructure(response.data));
      } else if (settingType === "position") {
        dispatch(settingsRequestPositions(response.data));
      } else if (settingType === "mailmessages") {
        dispatch(settingsRequestMailMessages(response.data));
      }
      dispatch(settingRequestFinished());
    } catch (e) {
      dispatch(settingsRequestError(e.response ? e.response.data : e.message));
    }
  };
};
export const fetchSettingCreate = (settingType, body) => {
  return async (dispatch, _, axios) => {
    try {
      message.info({
        content: "Идет проверка введенных данных!"
      });
      dispatch(settingsRequestStart());
      await axios.post(`/${settingType}`, body);
      dispatch(fetchSettings(settingType));
      dispatch(settingRequestFinished());
      message.success({
        className: "message-custom",
        content: `${settingType} создана успешно!`
      });
    } catch (errors) {
      dispatch(settingsRequestError(errors));
    }
  };
};

export const fetchSettingDelete = (settingType, id) => {
  return async (dispatch, _, axios) => {
    try {
      dispatch(settingsRequestStart());
      await axios.delete(`/${settingType}/${id}`);
      dispatch(settingRequestFinished());
      dispatch(fetchSettings(settingType));
    } catch (errors) {
      dispatch(settingsRequestError(errors));
    }
  };
};

export const fetchSettingUpdate = (settingType, record, id) => {
  return async (dispatch, getState, axios) => {
    try {
      const updatedSetting = {
        ...getState().settings.editableSetting,
        ...record
      };
      if (id) {
        updatedSetting.id = id;
      }
      dispatch(settingsRequestStart());
      await axios.put(`${settingType}/${updatedSetting.id}`, updatedSetting);
      dispatch(clearEditalbleElement());
      dispatch(settingRequestFinished());
      dispatch(fetchSettings(settingType));
    } catch (errors) {
      console.log(errors);
      // dispatch(settingsRequestError(errors))
    }
  };
};
