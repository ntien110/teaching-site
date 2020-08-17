import {userActionTypes} from "../type/user.type"

export const setUserInfo = (accessToken)=>({
    type: userActionTypes.SET_USER_INFO,
    payload: {accessToken}
})

export const sendLoginRequest = (email, password)=>({
    type: userActionTypes.SEND_LOGIN_REQUEST,
    payload: {
        email,
        password
    }
})

export const handleLoginRequestError = (errorCode)=>({
    type: userActionTypes.LOGIN_REQUEST_ERROR,
    payload: {
        errorCode
    }
})

export const sendRegisterRequest = (name, email, password, studentId)=>({
    type: userActionTypes.SEND_REGISTER_REQUEST,
    payload: {
        email,
        name,
        password,
        studentId
    }
})

export const handleRegisterRequestError = (errorCode)=>({
    type: userActionTypes.REGISTER_REQUEST_ERROR,
    payload: {
        errorCode
    }
})

export const renewAccessToken = () =>({
    type: userActionTypes.RENEW_ACCESS_TOKEN
})

export const updateUserInfo = () => ({
    type: userActionTypes.UPDATE_USER_INFO
})

export const finishActionQueue = (accessToken) => ({
    type: userActionTypes.FINISH_ACTION_QUEUE,
    payload: {
        accessToken
    }
})
