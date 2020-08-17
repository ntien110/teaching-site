import { subjectActionTypes } from "../../type/subject.type"
import { setCurrentSubject } from "../../action/subject.action"
import { getBlogsService } from "../../../service/blog.service"

import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs'

const fetchBlogsFulfilled = (blogs, subject) => {
    blogs = JSON.stringify(blogs)
    localStorage.setItem('blogs', blogs);
    return of(
        setCurrentSubject(subject)
    )
};

const fetchBlogsError = (errorCode, subject) => {
    console.log("Error on fetch blogs from server")
    return of(
        setCurrentSubject(subject)
    )
}

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const fetchBlogsEpic = action$ => action$.pipe(
    ofType(subjectActionTypes.SELECT_SUBJECT),
    mergeMap(action => 
        from(getBlogsService(action.payload.subject)).pipe(
            mergeMap(data => fetchBlogsFulfilled(data, action.payload.subject)),
            catchError(errorCode => fetchBlogsError(errorCode, action.payload.subject))
        )
    )
)

export default fetchBlogsEpic
