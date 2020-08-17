import { subjectActionTypes } from "../../type/subject.type";
import {
  handleEditSubjectRequestError,
  fetchSubjectList,
  sendEditSubjectRequest
} from "../../action/subject.action";
import { renewAccessToken } from "../../action/user.action"
import { addToQueue } from "../../../helper/actionQueue.helper"
import { editSubjectService } from "../../../service/subject.service";

import { ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

const editSubjectFulfilled = (userInfor) => {
  return of(
    fetchSubjectList()
  );
};

const editSubjectError = (errorCode, actionPayload) => {
  if (errorCode === 401) {
    addToQueue(sendEditSubjectRequest, actionPayload)
    return of(renewAccessToken())
  }
  return of(handleEditSubjectRequestError(errorCode));
};

/**
 * Intercept when action is emitted
 *
 * @param action$
 * @returns {*}
 */
const editSubjectEpic = (action$) =>
  action$.pipe(
    ofType(subjectActionTypes.SEND_EDIT_SUBJECT_REQUEST),
    mergeMap((action) => {
      return from(
        editSubjectService(
          action.payload.accessToken,
          action.payload.name,
          action.payload.file,
          action.payload.description,
          action.payload._id
        )
      ).pipe(
        mergeMap((data) => editSubjectFulfilled(data)),
        catchError((errorCode) => editSubjectError(errorCode, action.payload))
      )
    })
  );

export default editSubjectEpic;
