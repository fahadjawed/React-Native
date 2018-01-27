import {createStore} from 'redux'  
import thunk from 'redux-thunk'
import {combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import auth from './reducers/auth'
import get from './reducers/getdata'

import{ createLogger}from 'redux-logger'

const rootreducer = combineReducers({
auth,
get
})
const middleware = applyMiddleware(createLogger(),thunk)
let store = createStore(rootreducer,middleware);


store.subscribe(()=>{
    console.log(store.getState())
})
export default store