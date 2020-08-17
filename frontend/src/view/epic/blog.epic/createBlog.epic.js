import { subjectActionTypes } from "../../type/subject.type";
import {
  handleCreateBlogRequestError,
  selectSubject,
  sendCreateBlogRequest,
  setCurrentSubject,
  setSubjectContent
} from "../../action/subject.action";
import { renewAccessToken } from "../../action/user.action"
import { addToQueue } from "../../../helper/actionQueue.helper"
import { createBlogService } from "../../../service/blog.service";

import { ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

const createBlogFulfilled = (subject) => {
  return of(
    selectSubject(subject),
    setSubjectContent(null)
  );
};

const createBlogError = (errorCode, actionPayload) => {
  if (errorCode === 401) {
    addToQueue(sendCreateBlogRequest, actionPayload)
    return of(renewAccessToken())
  }
  return of(handleCreateBlogRequestError(errorCode));
};

/**
 * Intercept when action is emitted
 *
 * @param action$
 * @returns {*}
 */
const createBlogEpic = (action$) =>
  action$.pipe(
    ofType(subjectActionTypes.SEND_CREATE_BLOG_REQUEST),
    mergeMap((action) => {
      return from(
        createBlogService(
          action.payload.accessToken,
          action.payload.title,
          action.payload.content,
          action.payload.images,
          action.payload.subjectId
        )
      ).pipe(
        mergeMap((data) => createBlogFulfilled(data)),
        catchError((errorCode) => createBlogError(errorCode, action.payload))
      )
    })
  );

export default createBlogEpic;
