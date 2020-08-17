import { API } from "../constants.js"

const getSubjectsService = async () => {
    try {
        let response = await fetch(API.getSubjects, {
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

const createSubjectService = async (accessToken, name, image, description) => {
    try {
        const data = new FormData();
        data.append('name', name);
        if (image) {
            data.append('image', image);
        }
        if (description) {
            data.append('description', description);
        }
        let response = await fetch(API.createSubject, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Authorization': accessToken
            },
			body: data
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

const editSubjectService = async (accessToken, name, image, description, _id) => {
    try {
        const data = new FormData();
        data.append('name', name);
        if (image) {
            data.append('image', image);
        }
        if (description) {
            data.append('description', description);
        }
        if (_id) {
            data.append('_id', _id);
        }
        let response = await fetch(API.editSubject, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Authorization': accessToken
            },
			body: data
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

const deleteSubjectService = async (accessToken, subjectId) => {
    try {
        let response = await fetch(API.deleteSubject(subjectId), {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Authorization': accessToken
            }
        })
        if (response.status === 200) {
            let result = await response.json()
            return result
        }
        else {
            throw response.status
        }
    } catch (error) {
        throw error
    }
}

export {
    getSubjectsService,
    createSubjectService,
    deleteSubjectService,
    editSubjectService
}