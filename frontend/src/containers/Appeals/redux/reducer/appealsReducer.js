import {
    GET_APPEALS,
    APPEALS_REQUEST_PENDING,
    APPEALS_SUCCESS,
    APPEALS_ERROR,
    SELECTED_APPEALS
} from "../action/appealsActionType";

const initState = {
    // appeals: [{
    //     id: 1,
    //     title: "У меня не работает сайт",
    //     status: "На рассмотрении",
    //     description: "Какое-то описание Какое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описание"
    // }, {
    //     id: 2,
    //     title: "У меня не работает сайт",
    //     status: "Выполняется",
    //     description: "Какое-то описание Какое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описание"
    // }],
    appeals: [],
    selectedAppeals: [],
    loading: false,
    error: null,
}

const appealsReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEALS_REQUEST_PENDING:
            return {...state, loading: true};
        case APPEALS_SUCCESS:
            return {...state, loading: false, error: null};
        case APPEALS_ERROR:
            return {...state, loading: false, error: action.error};
        case GET_APPEALS:
            return {...state, appeals: action.value};
        case SELECTED_APPEALS:
            return {...state, selectedAppeals: action.values};
        default:
            return state;
    }
}

export default appealsReducer;