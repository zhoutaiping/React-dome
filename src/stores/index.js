import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'


var store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunkMiddleware)
);
export default store
