import { API } from "../constants.js"

const loginService = async (email, password) => {
    let data = {
        email,
        password
    }
    try {
        let response = await fetch(API.login, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        throw error
    }
}

const registerService = async (name, email, password, studentId)=>{
    let data = {
        name,
        email,
        studentId,
        password
    }
    try {
        let response = await fetch(API.register, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        throw error
    }
}

const renewAccessTokenService = async () => {
    try {
        let response = await fetch(API.renewToken, {
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

export {
    loginService,
    registerService,
    renewAccessTokenService
}