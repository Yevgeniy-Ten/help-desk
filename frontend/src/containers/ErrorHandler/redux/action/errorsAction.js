import { CLEAR_ALL_ERRORS, LOGIN_FAILED, REGISTER_FAILED } from "./errorsActionType";

export const clearAllErrors = () => ({ type: CLEAR_ALL_ERRORS });

export const errorLogin = (err) => ({ type: LOGIN_FAILED, err });
export const errorRegister = (err) => ({type:REGISTER_FAILED,err})
