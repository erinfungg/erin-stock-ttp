import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import stock from './stock'
import portfolio from './portfolio'
import transactions from './transactions'

const reducer = combineReducers({user, stock, portfolio, transactions})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './stock'
export * from './portfolio'
export * from './transactions'
