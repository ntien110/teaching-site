import { subjectActionTypes } from "../../type/subject.type";
import {
  handleCreateSubjectRequestError,
  fetchSubjectList,
  sendCreateSubjectRequest
} from "../../action/subject.action";
import { renewAccessToken } from "../../action/user.action"
import { addToQueue } from "../../../helper/actionQueue.helper"
import { createSubjectService } from "../../../service/subject.service";

import { ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

const createSubjectFulfilled = (userInfor) => {
  return of(
    fetchSubjectList()
  );
};

const createSubjectError = (errorCode, actionPayload) => {
  if (errorCode === 401) {
    addToQueue(sendCreateSubjectRequest, actionPayload)
    return of(renewAccessToken())
  }
  return of(handleCreateSubjectRequestError(errorCode));
};

/**
 * Intercept when action is emitted
 *
 * @param action$
 * @returns {*}
 */
const createSubjectEpic = (action$) =>
  action$.pipe(
    ofType(subjectActionTypes.SEND_CREATE_SUBJECT_REQUEST),
    mergeMap((action) => {
      return from(
        createSubjectService(
          action.payload.accessToken,
          action.payload.name,
          action.payload.file,
          action.payload.description
        )
      ).pipe(
        mergeMap((data) => createSubjectFulfilled(data)),
        catchError((errorCode) => createSubjectError(errorCode, action.payload))
      )
    })
  );

export default createSubjectEpic;
