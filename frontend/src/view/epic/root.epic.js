import {combineEpics} from "redux-observable";

// Import epics
import loginEpic from "./user.epic/login.epic"
import registerEpic from "./user.epic/register.epic"
import resetTokenEpic from "./user.epic/resetToken.epic"
import createSubjectEpic from "./subject.epic/createSubject.epic"
import fetchSubjectsEpic from "./subject.epic/fetchSubjects.epic"
import deleteSubjectEpic from "./subject.epic/deleteSubject.epic"
import editSubjectEpic from "./subject.epic/editSubject.epic"
import fetchBlogsEpic from "./blog.epic/fetchBlogs.epic"
import finishActionQueueEpic from "./user.epic/finishActionQueue.epic"
import createBlogEpic from "./blog.epic/createBlog.epic"

/**
 * List of epics
 *
 * @type {((function(*): *)|(function(*): *))[]}
 */
const epics = [
    loginEpic,
    registerEpic,
    resetTokenEpic,
    createSubjectEpic,
    fetchSubjectsEpic,
    deleteSubjectEpic,
    fetchBlogsEpic,
    finishActionQueueEpic,
    createBlogEpic,
    editSubjectEpic
]

export const rootEpic= combineEpics(...epics)