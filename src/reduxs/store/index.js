//  异步函数的触发中间件
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import combineReducers from '../reducer'

export default createStore(combineReducers, applyMiddleware(thunk))