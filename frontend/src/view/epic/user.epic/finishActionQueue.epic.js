import { userActionTypes } from "../../type/user.type";
import { popFromQueue } from "../../../helper/actionQueue.helper"

import { ofType } from "redux-observable";
import { mergeMap, timeout } from "rxjs/operators";
import { of, from } from "rxjs";

/**
 * Intercept when action  is emitted
 *
 * @param action$
 * @returns {*}
 */
const finishActionQueueEpic = (action$) =>
	action$.pipe(
		ofType(userActionTypes.FINISH_ACTION_QUEUE),
		mergeMap((action) => {
			let delay = async (period) => {
				const delay = ms => new Promise(res => setTimeout(res, ms))
				await delay(period)

				let actions = []
				let tempAction = popFromQueue()
				while (tempAction) {
					let params = []
					for(let[key, value] of Object.entries(tempAction.payload)){
						if(key == "accessToken"){
							params.push(action.payload.accessToken)
						}else{
							params.push(value)
						}
					}
					actions.push(tempAction.action(...params))
					tempAction = popFromQueue()
				}
				return actions
			}
			return from(delay(50)).pipe(
					mergeMap((actions) =>of(...actions))
				)
		}
		)
	);

export default finishActionQueueEpic;
