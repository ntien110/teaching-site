// import store from "../view/store/store"
const {decode} = require("jsonwebtoken");

export const getAccessTokenPayload = (accessToken)=>{
    // if (!accessToken){
    //     accessToken = store.getState().user.accessToken;
    // }

    if (!accessToken){
        return null;
    }
    accessToken = accessToken.split(" ")[1]
    let payload = decode(accessToken)

    return payload
}

export const checkAccessToken  = (accessToken)=>{
    let payload
    if(!accessToken){
        return false
    }else{
        payload = getAccessTokenPayload(accessToken)
    }
    
    if (payload.exp - Math.floor(Date.now()/1000) < 5){
        return false
    }

    return true
}