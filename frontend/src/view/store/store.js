import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger'
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from "../epic/root.epic";
import rootReducer from '../reducer/root.reducer'

const epicMiddleware = createEpicMiddleware()

/**
 * list of middlewares
 *
 * @type {(*|EpicMiddleware<Action, T, void, any>)[]}
 */

const middlewares = [
    logger, 
    epicMiddleware
]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

epicMiddleware.run(rootEpic)

export default store