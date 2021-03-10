import {
    GET_TICKETS,
    TICKETS_REQUEST_PENDING,
    TICKETS_SUCCESS,
    TICKETS_ERROR,
} from "../action/ticketsActionType";

const initState = {
    tickets: [{
        id: 1,
        title: "У меня не работает сайт",
        status: "На рассмотрении",
        description: "Какое-то описание Какое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описание"
    }, {
        id: 2,
        title: "У меня не работает сайт",
        status: "Выполняется",
        description: "Какое-то описание Какое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то описание"
    }],
    loading: false,
    error: null,
}

const ticketsReducer = (state = initState, action) => {
    switch (action.type) {
        case TICKETS_REQUEST_PENDING:
            return { ...state, loading: true };
        case TICKETS_SUCCESS:
            return { ...state, loading: false, error: null };
        case TICKETS_ERROR:
            return { ...state, loading: false, error: action.error };
        case GET_TICKETS:
            return { ...state, ticketsL: action.value };
        default:
            return state;
    }
}

export default ticketsReducer;