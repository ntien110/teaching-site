import { subjectActionTypes } from "../../type/subject.type"
import { fetchSubjectList, deleteSubject } from "../../action/subject.action"
import { deleteSubjectService } from "../../../service/subject.service"
import { addToQueue } from "../../../helper/actionQueue.helper"
import { renewAccessToken } from "../../action/user.action"

import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs'

const deleteSubjectFulfilled = () => {
    return of(
        fetchSubjectList()
    )
};

const deleteSubjectError = (errorCode, actionPayload) => {
    if (errorCode === 401) {
        addToQueue(deleteSubject, actionPayload)
        return of(renewAccessToken())
    }
    console.log(`Failed to delete subject with id ${errorCode}`)
}

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const deleteSubjectEpic = action$ => action$.pipe(
    ofType(subjectActionTypes.DELETE_SUBJECT),
    mergeMap(action =>
        from(deleteSubjectService(action.payload.accessToken, action.payload.subjectId)).pipe(
            mergeMap(data => deleteSubjectFulfilled(data)),
            catchError(errorCode => deleteSubjectError(errorCode, action.payload))
        )
    )
)

export default deleteSubjectEpic
