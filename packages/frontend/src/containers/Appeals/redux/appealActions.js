import {push} from "connected-react-router";
import {
    APPEAL_CREATE_SUCCESS,
    APPEAL_GET_SUCCESS,
    APPEAL_REQUEST_ERROR,
    APPEAL_REQUEST_STARTED,
    APPEAL_UPDATE_SUCCESS
} from "./action/appealsActionType";
import {message} from "antd";

const appealCreateSuccess = () => ({type: APPEAL_CREATE_SUCCESS})
const appealUpdateSuccess = () => ({type: APPEAL_UPDATE_SUCCESS})
const getAppealSuccess = (appeal) => ({type: APPEAL_GET_SUCCESS, appeal})
const appealRequestStarted = () => ({type: APPEAL_REQUEST_STARTED})
const appealRequestError = (errors) => ({type: APPEAL_REQUEST_ERROR, errors})

export const fetchAppeal = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealRequestStarted());
            const response = await axios.get(`/requests/${id}`);
            dispatch(getAppealSuccess(response.data))
        } catch (err) {
            dispatch(appealRequestError(err));
        }
    }
};
export const fetchCreateAppeal = (appealData) => {
    return async (dispatch, _, axios) => {
        try {
            message.info({
                content: "Идет проверка введенных данных!"
            })
            dispatch(appealRequestStarted());
            await axios.post("/requests", appealData);
            dispatch(push("/appeals"));
            dispatch(appealCreateSuccess())
            message.success({
                content: "Заяка создана!"
            })
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(appealRequestError(e.response.data));
                if (e.response.data.message) {
                    message.error({content: e.response.data.message})
                }
            } else {
                dispatch(appealRequestError({message: e.message}));
            }
        }
    }
};

export const fetchPutAppeal = (appealData) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(appealRequestStarted());
            await axios.put(`/requests/${appealData.id}`, appealData);
            dispatch(appealUpdateSuccess())
            dispatch(push("/appeals"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(appealRequestError(e.response.data));
            } else {
                dispatch(appealRequestError({message: e.message}));
            }
        }
    }
};
