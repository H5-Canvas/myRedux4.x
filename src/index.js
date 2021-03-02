import {createStore, combineReducers, applyMiddleware} from './redux/index.js';
import thunk from 'redux-thunk';
import saga from 'redux-saga';
// import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
const defaultstate = {
    name: 'zsj',
    age: 25
}
function age(state = [],action){
    switch(action.type){
        case 'CHANGE_NAME':
            state = action.data;
            return state
        default:
            return state    
    }
}
const nextState = {
    sex: 1,
    job: 'web'
}
function name(state = 0, action){
    switch(action.type){
        case 'CHANGE_JOB':
            state = action.data;
            return state
        case 'CHANGE_SEX':
            state = action.data;
            return state    
        default:
            return state    
    }
}
// store.replaceReducer(nextReducer);
const reducers = combineReducers({
    age,
    name
})
const store = createStore(
    reducers,
    defaultstate,
    applyMiddleware(thunk, saga)
)
console.log(store)
store.dispatch({type: 'CHANGE_JOB', data: 'kele'});
// store.dispatch({type: 'CHANGE_SEX', data: 2});
console.log(store.getState())
// store.subscribe(()=>{
//     console.log(111)
//     console.log(store.getState())
// })
// store.subscribe(()=>{
//     console.log(111)
//     console.log(store.getState())
// })
// store.subscribe(()=>{
//     console.log(111)
//     console.log(store.getState())
// })
// store.subscribe(()=>{
//     console.log(111)
//     console.log(store.getState())
// })
// store.subscribe(()=>{
//     console.log(111)
//     console.log(store.getState())
// })
// store.dispatch({type: 'CHANGE_NAME', data: 'kele'})