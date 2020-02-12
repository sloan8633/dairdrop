import { authConstants } from '../_constants'

export {
    signin
}

function signin (state = {}, action) {
    switch(action.type){
        case authConstants.SIGNIN_REQUEST:
            return {
                request: true
            };
        case authConstants.SIGNIN_SUCCESS:
            return {
                success: true
            };
        case authConstants.SIGNIN_FAILURE:
            return {
                failure: true
            };
        default: return state
    }
}