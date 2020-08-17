import { userActionTypes } from "../../type/user.type";
import { renewAccessTokenService } from "../../../service/authentication.service";
import { setUserInfo, finishActionQueue } from "../../action/user.action";

import { ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

const renewTokenFulfilled = (userInfor) => {
  return of(
    setUserInfo(userInfor.accessToken),
    finishActionQueue(userInfor.accessToken)
    );
};

const renewTokenError = (errorCode) => {
  // TODO: handle unknow error separately
  console.log(`${errorCode} on renew token`)
  return of()
  // return of(
  //   setUserInfo(undefined)
  // )
};

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const renewAccessTokenEpic = (action$) =>
  action$.pipe(
    ofType(userActionTypes.RENEW_ACCESS_TOKEN),
    mergeMap((action) =>
      from(renewAccessTokenService()).pipe(
        mergeMap((data) => renewTokenFulfilled(data)),
        catchError((errorCode) => renewTokenError(errorCode))
      )
    )
  );

export default renewAccessTokenEpic;
