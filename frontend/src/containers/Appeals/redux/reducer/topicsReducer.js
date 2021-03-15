import {
    GET_TOPICS,
    TOPICS_SUCCESS,
    TOPICS_ERROR,
} from "../action/topicsActionType";

const initState = {
    topics: [{id: 1, name: "Topic"}],
    loading: false,
    error: null,
}

const topicsReducer = (state = initState, action) => {
    switch (action.type) {
        case TOPICS_SUCCESS:
            return {...state, loading: false, error: null};
        case TOPICS_ERROR:
            return {...state, loading: false, error: action.error};
        case GET_TOPICS:
            return {...state, topics: action.value};
        default:
            return state;
    }
}

export default topicsReducer;