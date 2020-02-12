import { combineReducers } from 'redux'

import { 
    signin
} from './auth.reducer'

import { 
    alert
} from './alert.reducer'

const rootReducer = combineReducers({
    // auth reducer
    signin,

    // alert reducer
    alert
})

export default rootReducer