import { userActionTypes } from "../type/user.type";
import {getAccessTokenPayload} from "../../helper/authentication.helper"

const INITIAL_STATE = {
  accessToken: null,
  loginError: "",
  registerError: "",
  _id: undefined,
  email: undefined,
  userName: undefined,
  studentId: undefined,
  role:undefined
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case userActionTypes.SET_USER_INFO:
      if (!action.payload.accessToken){
        return {
          ...state,
          _id: null,
          email: null,
          userName: null,
          studentId: null,
          role: null,
          accessToken: null
        };
      }
      let accessTokenPayload = getAccessTokenPayload(action.payload.accessToken)
      return {
        ...state,
        _id: accessTokenPayload._id,
        email: accessTokenPayload.email,
        userName: accessTokenPayload.name,
        studentId: accessTokenPayload.studentId,
        role: accessTokenPayload? accessTokenPayload.role: null,
        accessToken: action.payload.accessToken
      };

    case userActionTypes.LOGIN_REQUEST_ERROR:
      let loginErrorMessage = "";
      if (action.payload.errorCode === 401) {
        loginErrorMessage = "Wrong email or password";
      } else {
        loginErrorMessage = "Unknown Error";
      }
      return {
        ...state,
        loginError: loginErrorMessage,
      };

    case userActionTypes.REGISTER_REQUEST_ERROR:
      let registerErrorMessage = "";
      if (action.payload.errorCode === 400) {
        registerErrorMessage = "Input is not valid.";
      } else if (action.payload.errorCode === 409) {
        registerErrorMessage = "Email has already been used."
      } else {
        registerErrorMessage = "Unknown Error";
      }
      return {
        ...state,
        registerError: registerErrorMessage,
    };

    default:
      return state;
  }
};

export default userReducer;
