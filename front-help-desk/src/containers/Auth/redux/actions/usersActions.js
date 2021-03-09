import {push} from "connected-react-router";
import {
    CLEAR_USER_STATE,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS, USER_REQUEST_PENDING
} from "./actionTypes";

export const registerUserSuccess = (user) => ({type: REGISTER_USER_SUCCESS, user})
export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user})
export const registerUserFailure = (error) => ({type: REGISTER_USER_FAILURE, error})
export const loginUserFailure = (error) => ({type: LOGIN_USER_FAILURE, error})
export const userRequestPending = () => ({type: USER_REQUEST_PENDING})
export const clearUserState = () => ({type: CLEAR_USER_STATE})

export const registerUser = (userData) => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.post("/users", userData)
            dispatch(registerUserSuccess(response.data))
            dispatch(push("/appeals"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({message: "Проверьте подключение"}));
            }
        }

    }
}


export const logoutUser = () => {
    return async (dispatch, _, axios) => {
        try {
            await axios.delete("/users/sessions");
            dispatch(clearUserState())
            dispatch(push("/auth"));
        } catch (e) {
            dispatch(clearUserState())
        }
    }
}


export const loginUser = (userData) => {
    return async (dispatch, _, axios) => {
        try {
            const response = await axios.post("/users/sessions", userData)
            dispatch(loginUserSuccess(response.data))
            dispatch(push("/"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({message: "Проверьте подключение"}));
            }
        }

    }
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