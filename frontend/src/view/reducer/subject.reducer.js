import { subjectActionTypes } from "../type/subject.type";

const INITIAL_STATE = {
  createSubjectError: "",
  subjects: [],
  currentSubject: null,
  subjectContent: null
};

const subjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case subjectActionTypes.SET_SUBJECT_CONTENT:
      return {
				...state,
				subjectContent: action.payload.subjectContent
			};
    
    case subjectActionTypes.SET_CURRENT_SUBJECT:
      
    let subjectContent=(action.payload.subjectContent === null)?null:state.subjectContent
			return {
				...state,
        currentSubject: action.payload.subject,
        subjectContent
			};

    case subjectActionTypes.UPDATE_SUBJECT_LIST:
      return {
        ...state,
        subjects: action.payload.subjects,
        createSubjectError: ""
      };

    case subjectActionTypes.CREATE_SUBJECT_REQUEST_ERROR:
      let createSubjectErrorMessage = "";
      if (action.payload.errorCode === 400) {
        createSubjectErrorMessage = "Invalid input";
      } else if (action.payload.errorCode === 409) {
        createSubjectErrorMessage = "Duplicated subject name";
      } else {
        createSubjectErrorMessage = "Unknown Error";
      }
      return {
        ...state,
        createSubjectError: createSubjectErrorMessage,
      };

    default:
      return state;
  }
};

export default subjectReducer;
