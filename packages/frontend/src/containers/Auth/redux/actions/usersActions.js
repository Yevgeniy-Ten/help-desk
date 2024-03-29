import {
  GET_USER_SUCCESS,
  CLEAR_USER_STATE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  USER_REQUEST_PENDING
} from "./actionTypes";
import { message } from "antd";
import { push } from "connected-react-router";

export const getUserSuccess = (user) => {
  return { type: GET_USER_SUCCESS, user };
};
export const registerUserSuccess = () => {
  return { type: REGISTER_USER_SUCCESS };
};
export const loginUserSuccess = (user) => {
  return { type: LOGIN_USER_SUCCESS, user };
};
export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    error
  };
};
export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    error
  };
};
export const userRequestPending = () => {
  return { type: USER_REQUEST_PENDING };
};
export const clearUserState = () => {
  return { type: CLEAR_USER_STATE };
};

export const getUser = () => {
  return async (dispatch, _, axios) => {
    try {
      const response = await axios.get("/users/current");
      dispatch(getUserSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const registerUser = (userData, pathPush) => {
  return async (dispatch, _, axios) => {
    try {
      await axios.post("/users", userData);
      dispatch(push(pathPush));
      message.success({
        content:
          "Регистрация прошла успешно! Пожалуйста потвердите вашу почту в ваших сообщениях почты.",
        className: "message-custom"
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(registerUserFailure(e.response.data));
      } else {
        dispatch(registerUserFailure({ message: e.message }));
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, _, axios) => {
    try {
      await axios.delete("/users/sessions");
      dispatch(clearUserState());
      dispatch(push("/auth"));
    } catch (e) {
      dispatch(clearUserState());
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch, _, axios) => {
    try {
      const response = await axios.post("/users/sessions", userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push("/appeals"));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(loginUserFailure(e.response.data));
      } else {
        dispatch(loginUserFailure({ message: e.message }));
      }
    }
  };
};

// export const facebookLogin = (dataCopy) => {
//     return async dispatch => {
//         try {
//             const response = await axios.post("/users/facebooklogin", dataCopy);
//
//             dispatch(loginUserSuccess(response.data.user));
//             dispatch(push("/"));
//         } catch (e) {
//             if (e.response && e.response.data) {
//                 dispatch(loginUserFailure(e.response.data));
//             } else {
//                 dispatch(loginUserFailure({global: "No internet"}));
//             }
//         }
//     }
// };
