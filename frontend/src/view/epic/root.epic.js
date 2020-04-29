import {combineEpics} from "redux-observable";

// Import epics

/**
 * List of epics
 *
 * @type {((function(*): *)|(function(*): *))[]}
 */
const epics = [
]

export const rootEpic= combineEpics(...epics)