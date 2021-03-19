import {
    AXIOS_AUTHORIZE_USER_ERROR,
    AXIOS_AUTHORIZE_USER_PENDING, AXIOS_DELETE_USER_ERROR, AXIOS_DELETE_USER_PENDING,
    AXIOS_USERS_ERROR,
    AXIOS_USERS_PENDING,
    AXIOS_USERS_SUCCESS
} from "./usersTypes";


export const getAllUsersPending = () => ({type: AXIOS_USERS_PENDING})
export const getAllUsersSuccess = (users) => ({type: AXIOS_USERS_SUCCESS, users})
export const getAllUsersError = () => ({type: AXIOS_USERS_ERROR})
export const onUserAuthorizedPending = () => ({type: AXIOS_AUTHORIZE_USER_PENDING})
export const onUserAuthorizedError = () => ({type: AXIOS_AUTHORIZE_USER_ERROR})
export const onDeleteUserPending = () => ({type: AXIOS_DELETE_USER_PENDING})
export const onDeleteUserError = () => ({type: AXIOS_DELETE_USER_ERROR})


export const fetchAllUsers = () => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(getAllUsersPending())
            const response = await axios.get("/users")
            // dispatch(getAllUsersSuccess([]))
            // dispatch(getAllUsersSuccess(response.data))
        } catch (e) {
            dispatch(getAllUsersError())
        }
    }
}
export const fetchAuthorizeUser = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(onUserAuthorizedPending())
            await axios.put(`/users/authorize/${id}`)
            dispatch(fetchAllUsers())
        } catch (e) {
            dispatch(onUserAuthorizedError())
        }
    }
}
export const fetchDeleteUser = (id) => {
    return async (dispatch, _, axios) => {
        try {
            dispatch(onDeleteUserPending())
            await axios.delete(`/users/${id}`)
            dispatch(fetchAllUsers())
        } catch (e) {
            dispatch(onDeleteUserError())
        }
    }
}