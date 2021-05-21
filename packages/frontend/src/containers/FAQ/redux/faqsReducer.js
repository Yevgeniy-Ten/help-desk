import {
  FAQS_MENU_SHOW,
  FAQS_REQUEST_COMPANIES,
  FAQS_REQUEST_DEPARTMENTS,
  FAQS_REQUEST_ERROR,
  FAQS_REQUEST_REGLAMENTS,
  FAQS_REQUEST_STARTED,
  FAQS_REQUEST_TOPICS,
  FAQS_REQUEST_POSITIONS,
  FAQS_SET_EDITABLE_ELEMENT,
  CLEAR_EDITABLE_ELEMENT,
  FAQS_REQUEST_FINISHED,
  FAQS_ORGSTRUCTURE_SUCCESS,
  FAQS_REQUEST_MAIL_MESSAGES
} from "./faqsTypes";

const initialState = {
  iconMenuShow: null,
  topics: [],
  reglaments: [],
  companies: [],
  departments: [],
  positions: [],
  isLoading: false,
  errors: null,
  editableFAQS: null,
  mailMessages: []
};

export const faqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAQS_MENU_SHOW:
      return { ...state, iconMenuShow: action.showMenu };
    case FAQS_REQUEST_STARTED:
      return { ...state, isLoading: true };
    case FAQS_REQUEST_ERROR:
      return { ...initialState, errors: action.errors ? action.errors : null };
    case FAQS_REQUEST_FINISHED:
      return { ...state, isLoading: false };
    case FAQS_REQUEST_TOPICS:
      return { ...state, topics: action.topics };
    case FAQS_REQUEST_COMPANIES:
      return { ...state, companies: action.companies };
    case FAQS_ORGSTRUCTURE_SUCCESS:
      return { ...state, orgStructures: action.orgstructures };
    case FAQS_REQUEST_REGLAMENTS:
      return { ...state, reglaments: action.reglaments };
    case FAQS_REQUEST_DEPARTMENTS:
      return { ...state, departments: action.departments };
    case FAQS_REQUEST_POSITIONS:
      return { ...state, positions: action.positions };
    case FAQS_REQUEST_MAIL_MESSAGES:
      return { ...state, mailMessages: action.mailMessages };
    case FAQS_SET_EDITABLE_ELEMENT:
      switch (action.payload.type) {
        case "topics":
          return {
            ...state,
            editableFAQS: state.topics.find((topic) => {
              return topic.id === action.payload.FAQSId;
            })
          };
        case "reglaments":
          return {
            ...state,
            // eslint-disable-next-line array-callback-return
            editableFAQS: state.reglaments.reduce(
              (regForEdit, reg) => {
                if (!regForEdit) {
                  return regForEdit;
                }
                if (!regForEdit.companyId) {
                  if (
                    regForEdit.topicId === reg.topicId &&
                    regForEdit.departmentId &&
                    reg.departmentId
                  ) {
                    switch (reg.priority) {
                      case "Средний":
                        return {
                          ...regForEdit,
                          middle: reg.deadline
                        };
                      case "Критично":
                        return {
                          ...regForEdit,
                          incident: reg.deadline
                        };
                      case "Стандартно":
                        return {
                          ...regForEdit,
                          standart: reg.deadline
                        };
                      default:
                        return {
                          ...regForEdit,
                          high: reg.deadline
                        };
                    }
                  }
                }
                if (
                  regForEdit.topicId === reg.topicId &&
                  regForEdit.departmentId &&
                  reg.departmentId &&
                  regForEdit.companyId === reg.companyId
                ) {
                  switch (reg.priority) {
                    case "Средний":
                      return {
                        ...regForEdit,
                        middle: reg.deadline
                      };
                    case "Критично":
                      return {
                        ...regForEdit,
                        incident: reg.deadline
                      };
                    case "Стандартно":
                      return {
                        ...regForEdit,
                        standart: reg.deadline
                      };
                    default:
                      return {
                        ...regForEdit,
                        high: reg.deadline
                      };
                  }
                }
                return regForEdit;
              },
              state.reglaments.find((reglament) => {
                return reglament.id === action.payload.FAQSId;
              })
            )
          };
        case "orgstructures":
          return {
            ...state,
            editableFAQS: state.orgStructures.find((orgS) => {
              return orgS.id === action.payload.FAQSId;
            })
          };
        case "companies":
          return {
            ...state,
            editableFAQS: state.companies.find((company) => {
              return company.id === action.payload.FAQSId;
            })
          };
        case "departments":
          return {
            ...state,
            editableFAQS: state.departments.find((department) => {
              return department.id === action.payload.FAQSId;
            })
          };
        case "positions":
          return {
            ...state,
            editableFAQS: state.positions.find((position) => {
              return position.id === action.payload.FAQSId;
            })
          };
        case "mailmessages":
          return {
            ...state,
            editableFAQS: state.mailMessages.find((mailMessage) => {
              return mailMessage.id === action.payload.FAQSId;
            })
          };
        default:
          return state;
      }
    case CLEAR_EDITABLE_ELEMENT:
      return { ...state, editableFAQS: null };
    default:
      return state;
  }
};
export default faqsReducer;
