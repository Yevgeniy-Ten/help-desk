import {
  FAQS_MENU_SHOW,
  FAQS_REQUEST_WEBSITES,
  FAQS_REQUEST_BOOKKEEPING,
  FAQS_REQUEST_MEDICINE,
  FAQS_REQUEST_SUPPORTS,
  FAQS_DELETE_SUCCESS,
  FAQS_REQUEST_ERROR,
  FAQS_REQUEST_FINISHED,
  FAQS_REQUEST_MAIL_MESSAGES,
  CLEAR_EDITABLE_ELEMENT,
  FAQS_SET_EDITABLE_ELEMENT
} from "./faqsTypes";
import { message } from "antd";

export const faqsIconMenuShow = (showMenu) => {
  return { type: FAQS_MENU_SHOW, showMenu };
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
export const faqsRequestWebsites = (websites) => {
  return {
    type: FAQS_REQUEST_WEBSITES,
    websites
  };
};
export const faqsRequestSupports = (supports) => {
  return {
    type: FAQS_REQUEST_SUPPORTS,
    supports
  };
};
export const faqsRequestMailMessages = (mailMessages) => {
  return {
    type: FAQS_REQUEST_MAIL_MESSAGES,
    mailMessages
  };
};
export const faqsRequestMedicine = (medicine) => {
  return {
    type: FAQS_REQUEST_MEDICINE,
    medicine
  };
};
export const faqsRequestBookkeeping = (bookkeeping) => {
  return {
    type: FAQS_REQUEST_BOOKKEEPING,
    bookkeeping
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

export const fetchFaqs = (faqType, queryParams) => {
  return async (dispatch, _, axios) => {
    try {
      // dispatch(faqsRequestStart());
      const response = await axios.get(`/${faqType}`, {
        params: {
          ...queryParams
        }
      });
      if (faqType === "bookkeeping") {
        dispatch(faqsRequestBookkeeping(response.data));
      } else if (faqType === "medicine") {
        dispatch(faqsRequestMedicine(response.data));
      } else if (faqType === "websites") {
        dispatch(faqsRequestWebsites(response.data));
      } else if (faqType === "supports") {
        dispatch(faqsRequestSupports(response.data));
      } else if (faqType === "mailmessages") {
        dispatch(faqsRequestMailMessages(response.data));
      }
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
      dispatch(fetchFaqs(faqType));
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
      dispatch(fetchFaqs(faqType));
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
      dispatch(fetchFaqs(faqType));
    } catch (errors) {
      console.log(errors);
      // dispatch(faqsRequestError(errors))
    }
  };
};
