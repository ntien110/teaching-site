import { subjectActionTypes } from "../../type/subject.type"
import { updateSubjectList } from "../../action/subject.action"
import { getSubjectsService } from "../../../service/subject.service"

import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs'

const fetchSubjectsFulfilled = subjects => {
    return of(
        updateSubjectList(subjects)
    )
};

const fetchSubjectsError = errorCode => {
    console.log("Error on fetch subjects from server")
}

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const fetchSubjectsEpic = action$ => action$.pipe(
    ofType(subjectActionTypes.FETCH_SUBJECT_LIST),
    mergeMap(action => 
        from(getSubjectsService()).pipe(
            mergeMap(data => fetchSubjectsFulfilled(data)),
            catchError(errorCode => fetchSubjectsError(errorCode))
        )
    )
)

export default fetchSubjectsEpic
