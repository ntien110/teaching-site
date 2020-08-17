const getBaseUrl = ()=>{
    if (process.env.REACT_APP_NODE_ENV !== "production"){
        return process.env.REACT_APP_LOCAL_URL
    }
    return window.location.href
}

export {
    getBaseUrl  
}