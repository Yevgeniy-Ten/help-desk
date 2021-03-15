import {
    GET_TOPICS,
    TOPICS_SUCCESS,
    TOPICS_ERROR,
} from "./topicsActionType";

export const getTopics = (value) => ({ type: GET_TOPICS, value });
export const topicsSuccess = () => ({ type: TOPICS_SUCCESS });
export const topicsError = (error) => ({ type: TOPICS_ERROR, error });

export const fetchTopics = () => {
    return async (dispatch, _, axios) => {
        try {
            let urlAppeal = '/topics';
            const response = await axios.get(urlAppeal);
            if (response.data !== null) {
                dispatch(getTopics(response.data));
                dispatch(topicsSuccess());
            }
        } catch (err) {
            dispatch(topicsError(err));
        }
    }
};
