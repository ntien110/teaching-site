import {combineReducers} from "redux";

// Import reducers
import userReducer from "./user.reducer"
import subjectReducer from "./subject.reducer"


export default combineReducers({
    user: userReducer,
    subject: subjectReducer
})