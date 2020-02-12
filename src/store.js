import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './_reducers'
import { LocalConfig } from './LocalConfig'

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    LocalConfig.isShownLog ?
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
    : applyMiddleware(
        thunkMiddleware,
    )
);
