import {getBaseUrl} from "./helper/url.helper"

let API = {
    // User
    getUser: `${getBaseUrl()}/api/user`,
    login: `${getBaseUrl()}/api/user/login`,
    register: `${getBaseUrl()}/api/user/register`,
    renewToken: `${getBaseUrl()}/api/user/renew-token`,
    
    // File
    image: (id)=>  `${getBaseUrl()}/api/file/image/${id}`,
    imageOnlyUpload: `${getBaseUrl()}/api/file/imageUpload`,

    // Subject
    getSubjects: `${getBaseUrl()}/api/subject`,
    createSubject: `${getBaseUrl()}/api/subject/create`,
    editSubject: `${getBaseUrl()}/api/subject/edit`,
    deleteSubject: (subjectId) => `${getBaseUrl()}/api/subject/${subjectId}`,

    // Blog
    getBlogs: (subjectId) => `${getBaseUrl()}/api/blog/${subjectId}`,
    createBlog: `${getBaseUrl()}/api/blog/create`,
}

export {API}
