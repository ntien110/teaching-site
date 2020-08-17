import { API } from "../constants.js"

const getBlogsService = async (subject) => {
    try {
        let response = await fetch(API.getBlogs(subject._id), {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            return await response.json()
        }
        else {
            throw response.status
        }
    } catch (error) {
        throw error
    }
}

const createBlogService = async (accessToken, title, content, images, subjectId) => {
    try {
        const data = {
            title, 
            content, 
            images, 
            subjectId
        }
        let response = await fetch(API.createBlog, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            return await response.json()
        }
        else {
            throw response.status
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    getBlogsService,
    createBlogService
}