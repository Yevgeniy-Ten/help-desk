import {
  FAQS_REQUEST,
  FAQS_REQUEST_STARTED,
  FAQS_DELETE_SUCCESS,
  FAQS_REQUEST_ERROR,
  FAQS_REQUEST_FINISHED,
  CLEAR_EDITABLE_ELEMENT,
  FAQS_SET_EDITABLE_ELEMENT
} from "./faqsTypes";
import { message } from "antd";

export const faqsRequestStart = () => {
  return { type: FAQS_REQUEST_STARTED };
};
export const faqsRequestError = (errors) => {
  return {
    type: FAQS_REQUEST_ERROR,
    errors
  };
};
export const faqRequestFinished = () => {
  return {
    type: FAQS_REQUEST_FINISHED
  };
};
export const faqsRequestFaq = (faqs) => {
  return {
    type: FAQS_REQUEST,
    faqs
  };
};

export const faqDeleteSuccess = () => {
  return { type: FAQS_DELETE_SUCCESS };
};
export const setEditableFaq = (type, faqId) => {
  return {
    type: FAQS_SET_EDITABLE_ELEMENT,
    payload: {
      type,
      faqId
    }
  };
};
export const clearEditalbleElement = () => {
  return { type: CLEAR_EDITABLE_ELEMENT };
};

export const fetchFaq = (faqId) => {
  return async (dispatch, _, axios) => {
    try {
      dispatch(faqsRequestStart());
      const response = await axios.get(`/topics/solutions/${faqId}`);
      dispatch(faqsRequestFaq(response.data));
      dispatch(faqRequestFinished());
    } catch (e) {
      dispatch(faqsRequestError(e.response ? e.response.data : e.message));
    }
  };
};
export const fetchFaqCreate = (faqType, body) => {
  return async (dispatch, _, axios) => {
    try {
      message.info({
        content: "Идет проверка введенных данных!"
      });
      // dispatch(faqsRequestStart());
      await axios.post(`/${faqType}`, body);
      dispatch(fetchFaq(faqType));
      dispatch(faqRequestFinished());
      message.success({
        className: "message-custom",
        content: `${faqType} создана успешно!`
      });
    } catch (errors) {
      dispatch(faqsRequestError(errors));
    }
  };
};

export const fetchFaqDelete = (faqType, id) => {
  return async (dispatch, _, axios) => {
    try {
      // dispatch(faqsRequestStart());
      await axios.delete(`/${faqType}/${id}`);
      dispatch(faqRequestFinished());
      dispatch(fetchFaq(faqType));
    } catch (errors) {
      dispatch(faqsRequestError(errors));
    }
  };
};

export const fetchFaqUpdate = (faqType, record, id) => {
  return async (dispatch, getState, axios) => {
    try {
      const updatedFaq = {
        ...getState().faqs.editableFaq,
        ...record
      };
      if (id) {
        updatedFaq.id = id;
      }
      // dispatch(faqsRequestStart());
      await axios.put(`${faqType}/${updatedFaq.id}`, updatedFaq);
      dispatch(clearEditalbleElement());
      dispatch(faqRequestFinished());
      dispatch(fetchFaq(faqType));
    } catch (errors) {
      console.log(errors);
      // dispatch(faqsRequestError(errors))
    }
  };
};
