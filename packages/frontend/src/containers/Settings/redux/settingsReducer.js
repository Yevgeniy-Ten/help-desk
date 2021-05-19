import {
  SETTING_REQUEST_COMPANIES,
  SETTING_REQUEST_DEPARTMENTS,
  SETTING_REQUEST_ERROR,
  SETTING_REQUEST_REGLAMENTS,
  SETTING_REQUEST_STARTED,
  SETTING_REQUEST_TOPICS,
  SETTING_REQUEST_POSITIONS,
  SETTING_SET_EDITABLE_ELEMENT,
  CLEAR_EDITABLE_ELEMENT,
  SETTING_REQUEST_FINISHED,
  SETTING_ORGSTRUCTURE_SUCCESS,
  SETTING_REQUEST_MAIL_MESSAGES
} from "./settingsTypes";

const initialState = {
  orgStructures: [],
  topics: [],
  reglaments: [],
  companies: [],
  departments: [],
  positions: [],
  isLoading: false,
  errors: null,
  editableSetting: null,
  mailMessages: []
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_REQUEST_STARTED:
      return { ...state, isLoading: true };
    case SETTING_REQUEST_ERROR:
      return { ...initialState, errors: action.errors ? action.errors : null };
    case SETTING_REQUEST_FINISHED:
      return { ...state, isLoading: false };
    case SETTING_REQUEST_TOPICS:
      return { ...state, topics: action.topics };
    case SETTING_REQUEST_COMPANIES:
      return { ...state, companies: action.companies };
    case SETTING_ORGSTRUCTURE_SUCCESS:
      return { ...state, orgStructures: action.orgstructures };
    case SETTING_REQUEST_REGLAMENTS:
      return { ...state, reglaments: action.reglaments };
    case SETTING_REQUEST_DEPARTMENTS:
      return { ...state, departments: action.departments };
    case SETTING_REQUEST_POSITIONS:
      return { ...state, positions: action.positions };
    case SETTING_REQUEST_MAIL_MESSAGES:
      return { ...state, mailMessages: action.mailMessages };
    case SETTING_SET_EDITABLE_ELEMENT:
      switch (action.payload.type) {
        case "topics":
          return {
            ...state,
            editableSetting: state.topics.find(
              (topic) => topic.id === action.payload.settingId
            )
          };
        case "reglaments":
          return {
            ...state,
            // eslint-disable-next-line array-callback-return
            editableSetting: state.reglaments.reduce(
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
              state.reglaments.find(
                (reglament) => reglament.id === action.payload.settingId
              )
            )
          };
        case "orgstructures":
          return {
            ...state,
            editableSetting: state.orgStructures.find(
              (orgS) => orgS.id === action.payload.settingId
            )
          };
        case "companies":
          return {
            ...state,
            editableSetting: state.companies.find(
              (company) => company.id === action.payload.settingId
            )
          };
        case "departments":
          return {
            ...state,
            editableSetting: state.departments.find(
              (department) => department.id === action.payload.settingId
            )
          };
        case "positions":
          return {
            ...state,
            editableSetting: state.positions.find(
              (position) => position.id === action.payload.settingId
            )
          };
        case "mailmessages":
          return {
            ...state,
            editableSetting: state.mailMessages.find(
              (mailMessage) => mailMessage.id === action.payload.settingId
            )
          };
        default:
          return state;
      }
    case CLEAR_EDITABLE_ELEMENT:
      return { ...state, editableSetting: null };
    default:
      return state;
  }
};
export default settingsReducer;
