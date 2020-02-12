import { alertConstants } from '../_constants'

export const alertActions = {
    success,
    error,
}

function success(msg){
    return { type: alertConstants.SUCCESS, msg }
}

function error(msg){
    return { type: alertConstants.ERROR, msg }
}