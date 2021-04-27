import { push } from "connected-react-router";
import {
  APPEAL_CREATE_SUCCESS,
  APPEAL_GET_SUCCESS,
  APPEAL_REQUEST_ERROR,
  APPEAL_REQUEST_STARTED,
  APPEAL_UPDATE_SUCCESS
} from "./action/appealsActionType";
import { message } from "antd";

const appealCreateSuccess = () => {
  return { type: APPEAL_CREATE_SUCCESS };
};
const appealUpdateSuccess = () => {
  return { type: APPEAL_UPDATE_SUCCESS };
};
const getAppealSuccess = (appeal) => {
  return { type: APPEAL_GET_SUCCESS, appeal };
};
const appealRequestStarted = () => {
  return { type: APPEAL_REQUEST_STARTED };
};
const appealRequestError = (errors) => {
  return { type: APPEAL_REQUEST_ERROR, errors };
};

export const fetchAppeal = (id) => {
  return async (dispatch, _, axios) => {
    try {
      dispatch(appealRequestStarted());
      const response = await axios.get(`/requests/${id}`);
      dispatch(getAppealSuccess(response.data));
    } catch (err) {
      dispatch(appealRequestError(err));
    }
  };
};
export const fetchCreateAppeal = (appealData) => {
  return async (dispatch, _, axios) => {
    try {
      message.info({
        content: "Идет проверка введенных данных!"
      });
      dispatch(appealRequestStarted());
      await axios.post("/requests", appealData);
      dispatch(push("/appeals"));
      dispatch(appealCreateSuccess());
      message.success({
        content: "Заяка создана!"
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(appealRequestError(e.response.data));
        if (e.response.data.message) {
          message.error({ content: e.response.data.message });
        }
      } else {
        dispatch(appealRequestError({ message: e.message }));
      }
    }
  };
};

export const fetchPutAppeal = (id, appealData) => {
  return async (dispatch, _, axios) => {
    try {
      message.info({
        content: "Идет проверка данных!"
      });
      dispatch(appealRequestStarted());
      await axios.put(`/requests/${id}`, appealData);
      dispatch(appealUpdateSuccess());
      dispatch(push("/appeals"));
      message.success({
        content: "Изменения сохранены!"
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(appealRequestError(e.response.data));
      } else {
        dispatch(appealRequestError({ message: e.message }));
      }
    }
  };
};

export const fetchDeleteAppeal = (id, appealData) => {
  return async (dispatch, _, axios) => {
    try {
      let mssg = "Заявка удалена!";
      let urlRequest = `/requests/${id}`;
      if (!id) {
        urlRequest = `/requests`;
        mssg = "Заявки удалены!";
      }
      message.info({
        content: "Идет удаление!"
      });
      dispatch(appealRequestStarted());
      await axios.delete(urlRequest, { data: appealData });
      dispatch(appealUpdateSuccess());
      dispatch(push("/appeals"));
      message.success({
        content: mssg
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(appealRequestError(e.response.data));
      } else {
        dispatch(appealRequestError({ message: e.message }));
      }
    }
  };
};
