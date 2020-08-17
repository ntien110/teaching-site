import { subjectActionTypes } from "../type/subject.type"

export const sendCreateSubjectRequest = (accessToken, name, file, description) => ({
    type: subjectActionTypes.SEND_CREATE_SUBJECT_REQUEST,
    payload: { accessToken, name, file, description }
})

export const handleCreateSubjectRequestError = (errorCode) => ({
    type: subjectActionTypes.CREATE_SUBJECT_REQUEST_ERROR,
    payload: {
        errorCode
    }
})

export const sendEditSubjectRequest = (accessToken, name, file, description, _id) => ({
    type: subjectActionTypes.SEND_EDIT_SUBJECT_REQUEST,
    payload: { accessToken, name, file, description, _id }
})

export const handleEditSubjectRequestError = (errorCode) => ({
    type: subjectActionTypes.EDIT_SUBJECT_REQUEST_ERROR,
    payload: {
        errorCode
    }
})

export const fetchSubjectList = () => ({
    type: subjectActionTypes.FETCH_SUBJECT_LIST
})

export const updateSubjectList = (subjects) => ({
    type: subjectActionTypes.UPDATE_SUBJECT_LIST,
    payload: {
        subjects
    }
})

export const deleteSubject = (accessToken, subjectId) => ({
    type: subjectActionTypes.DELETE_SUBJECT,
    payload: {
        accessToken,
        subjectId
    }
})

export const selectSubject = (subject) => ({
    type: subjectActionTypes.SELECT_SUBJECT,
    payload: {
        subject
    }
})

export const setCurrentSubject = (subject) => ({
    type: subjectActionTypes.SET_CURRENT_SUBJECT,
    payload: {
        subject
    }
})

export const unselectSubject = () => ({
    type: subjectActionTypes.SET_CURRENT_SUBJECT,
    payload: {
        subject: null,
        subjectContent: null
    }
})

export const setSubjectContent = (subjectContent) => ({
    type: subjectActionTypes.SET_SUBJECT_CONTENT,
    payload: {
        subjectContent
    }
})

export const sendCreateBlogRequest = (accessToken, title, content, images, subjectId) => ({
    type: subjectActionTypes.SEND_CREATE_BLOG_REQUEST,
    payload: { accessToken, title, content, images, subjectId }
})

export const handleCreateBlogRequestError = (errorCode) => ({
    type: subjectActionTypes.CREATE_BLOG_REQUEST_ERROR,
    payload: {
        errorCode
    }
})
