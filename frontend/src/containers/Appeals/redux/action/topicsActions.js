import {SET_TOPICS} from "./topicsActionType";
export const setTopics = (topics) => ({type: SET_TOPICS, topics});
export const fetchTopics = () => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.get("/topics");
            dispatch(setTopics(response.data))
        } catch {
            // топиков нет)
        }
    }
};
