import { userActionTypes } from "../../type/user.type";
import {
  setUserInfo,
  handleRegisterRequestError,
} from "../../action/user.action";
import { registerService } from "../../../service/authentication.service";

import { ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

const registerFulfilled = (userInfor) => {
  return of(setUserInfo(userInfor.accessToken));
};

const registerError = (errorCode) => {
  return of(handleRegisterRequestError(errorCode));
};

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const registerEpic = (action$) =>
  action$.pipe(
    ofType(userActionTypes.SEND_REGISTER_REQUEST),
    mergeMap((action) =>
      from(
        registerService(
          action.payload.name,
          action.payload.email,
          action.payload.password,
          action.payload.studentId
        )
      ).pipe(
        mergeMap((data) => registerFulfilled(data)),
        catchError((errorCode) => registerError(errorCode))
      )
    )
  );

export default registerEpic;
