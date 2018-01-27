import {createStore} from 'redux'  
import thunk from 'redux-thunk'
import {combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import auth from './reducers/auth'
import region from './reducers/region'



import{ createLogger}from 'redux-logger'

const rootReducer = combineReducers({auth,region})

const middleware = applyMiddleware(createLogger(),thunk)
let store = createStore(rootReducer,middleware);


store.subscribe(()=>{
    console.log(store.getState())
})
export default store