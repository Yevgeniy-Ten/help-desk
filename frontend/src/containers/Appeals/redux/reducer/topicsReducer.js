import {
    GET_TOPICS,
    TOPICS_SUCCESS,
    TOPICS_ERROR, SET_TOPICS,
} from "../action/topicsActionType";

const initState = {
    topics: [{id: 1, name: "Сайты"}],
}

const topicsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TOPICS:
            return {topics: action.topics}
        default:
            return state;
    }
}

export default topicsReducer;