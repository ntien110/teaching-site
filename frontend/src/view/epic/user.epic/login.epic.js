import { userActionTypes } from "../../type/user.type"
import { setUserInfo, handleLoginRequestError } from "../../action/user.action";
import { loginService } from "../../../service/authentication.service"

import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs'

const loginFulfilled = userInfor => {
    return of(
        setUserInfo(userInfor.accessToken)
    )
};

const loginError = errorCode => {
    return of(
        handleLoginRequestError(errorCode)
    )
}

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const loginEpic = action$ => action$.pipe(
    ofType(userActionTypes.SEND_LOGIN_REQUEST),
    mergeMap(action => 
        from(loginService(action.payload.email, action.payload.password)).pipe(
            mergeMap(data => loginFulfilled(data)),
            catchError(errorCode => loginError(errorCode))
        )
    )
)

export default loginEpic
