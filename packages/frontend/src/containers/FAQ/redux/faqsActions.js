import {
  FAQS_MENU_SHOW,
  CLEAR_EDITABLE_ELEMENT,
  FAQS_DELETE_SUCCESS,
  FAQS_ORGSTRUCTURE_SUCCESS,
  FAQS_REQUEST_COMPANIES,
  FAQS_REQUEST_DEPARTMENTS,
  FAQS_REQUEST_ERROR,
  FAQS_REQUEST_FINISHED,
  FAQS_REQUEST_MAIL_MESSAGES,
  FAQS_REQUEST_POSITIONS,
  FAQS_REQUEST_REGLAMENTS,
  FAQS_REQUEST_TOPICS,
  FAQS_SET_EDITABLE_ELEMENT
} from "./faqsTypes";
import { message } from "antd";

export const faqsIconMenuShow = (showMenu) => {
  return { type: FAQS_MENU_SHOW, showMenu };
};
export const settingsRequestError = (errors) => {
  return {
    type: FAQS_REQUEST_ERROR,
    errors
  };
};
export const settingRequestFinished = () => {
  return {
    type: FAQS_REQUEST_FINISHED
  };
};
export const settingsRequestTopics = (topics) => {
  return {
    type: FAQS_REQUEST_TOPICS,
    topics
  };
};
export const settingsRequestReglaments = (reglaments) => {
  return {
    type: FAQS_REQUEST_REGLAMENTS,
    reglaments
  };
};
export const settingsRequestMailMessages = (mailMessages) => {
  return {
    type: FAQS_REQUEST_MAIL_MESSAGES,
    mailMessages
  };
};
export const settingsRequestDepartments = (departments) => {
  return {
    type: FAQS_REQUEST_DEPARTMENTS,
    departments
  };
};
export const settingsRequestCompanies = (companies) => {
  return {
    type: FAQS_REQUEST_COMPANIES,
    companies
  };
};
export const settingsRequestPositions = (positions) => {
  return {
    type: FAQS_REQUEST_POSITIONS,
    positions
  };
};
export const settingDeleteSuccess = () => {
  return { type: FAQS_DELETE_SUCCESS };
};
export const setEditableSetting = (type, settingId) => {
  return {
    type: FAQS_SET_EDITABLE_ELEMENT,
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
    type: FAQS_ORGSTRUCTURE_SUCCESS,
    orgstructures
  };
};

export const fetchSettings = (settingType, queryParams) => {
  return async (dispatch, _, axios) => {
    try {
      // dispatch(settingsRequestStart());
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
      // dispatch(settingsRequestStart());
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
      // dispatch(settingsRequestStart());
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
      // dispatch(settingsRequestStart());
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
