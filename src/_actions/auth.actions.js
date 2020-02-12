import { authConstants } from '../_constants'

export const authActions = {
    signin,

}

function signin(userSession){
    return dispatch => {
        dispatch(request())
        userSession.redirectToSignIn()
    }

    function request(){ return { type: authConstants.SIGNIN_REQUEST }}
}