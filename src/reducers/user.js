import ObjectAssign from 'object-assign'
import * as types from '../constants/actionTypes';
const defaultUserState = {
	cityList:[]
}

function user(state = defaultUserState,action){
	switch (action.type){
        case types.GET_CITYLIST:
            return ObjectAssign({}, state, {
                cityList:action.result
            })
		default:
			return state;
	}
}
module.exports = user;