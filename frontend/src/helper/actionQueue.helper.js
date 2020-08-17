let actionQueue=[]

export const addToQueue = (action,  payload) =>{
    actionQueue.push({action,payload})
}

export const popFromQueue = () => {
    return actionQueue.pop()
}