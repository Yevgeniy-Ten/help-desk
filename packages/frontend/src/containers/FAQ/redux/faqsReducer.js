import {
  FAQS_REQUEST_ERROR,
  FAQS_REQUEST_STARTED,
  FAQS_REQUEST,
  FAQS_SET_EDITABLE_ELEMENT,
  CLEAR_EDITABLE_ELEMENT,
  FAQS_REQUEST_FINISHED
} from "./faqsTypes";

const initialState = {
  faqs: [],

  isLoading: false,
  errors: null,
  editableFAQS: null,
  mailMessages: []
};

export const faqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAQS_REQUEST_STARTED:
      return { ...state, isLoading: true };
    case FAQS_REQUEST_ERROR:
      return { ...initialState, errors: action.errors ? action.errors : null };
    case FAQS_REQUEST_FINISHED:
      return { ...state, isLoading: false };
    // sss
    case FAQS_REQUEST:
      return { ...state, faqs: action.faqs };

    case FAQS_SET_EDITABLE_ELEMENT:
      return {
        ...state,
        editableFAQS: state.faqs.find((faq) => {
          return faq.id === action.faqId;
        })
      };
    case CLEAR_EDITABLE_ELEMENT:
      return { ...state, editableFAQS: null };
    default:
      return state;
  }
};
export default faqsReducer;
