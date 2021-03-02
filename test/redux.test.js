import createStore from '../src/redux/createStore';
import combineReducers from '../src/redux/combineReducers';
import compose from '../src/redux/compose';
const defaultState = {
    count: 0
}
test('使用 getState 获取数据', () => {
    const store = createStore(()=>{}, defaultState);
    const count = store.getState().count;
    expect(count).toBe(0)
})
test('使用 dispatch 修改 state 状态', () => {
    function reducer(state, action) {
        switch (action.type) {
            case 'CHANGE_NAME':
                state.count++
                return state
            default:
                return state
        }
    }
    const store = createStore(reducer, defaultState);
    store.dispatch({type: 'CHANGE_NAME'});
    const count = store.getState().count
    expect(count).toBe(1)
})
const oldState = {
    name: 'zsj',
    age: 25
}
test('使用 replaceReducer 修改 reducer state 结构', () => {
    function reducer1(state, action){
        switch(action.type){
            case 'CHANGE_NAME':
                state.name = action.data;
                return state
            case 'CHANGE_AGE':
                state.age = action.data;
                return state
            default:
                return state   
        }
    }
    const store = createStore(
        reducer1,
        oldState
    )
    function reducer2(state = newState, action){
        switch(action.type){
            case 'CHANGE_SEX':
                state.sex = action.data;
                return state
            case 'CHANGE_WEB':
                state.job = action.data;
                return state
            default:
                return state   
        }
    }
    store.replaceReducer(reducer2);
    store.dispatch({type: 'CHANGE_SEX', data: 2})
    const sex = store.getState().sex
    expect(sex).toBe(2)
})
const combineReducersState = {
    name: 'zsj',
    age: 25
}
test('使用 combineReducers 模块化 reducer', () => {
    function name(state, action){
        switch (action.type) {
            case 'CHANGE_NAME':
                state = action.data
                return state
            default:
                return state
        }
    }
    function age(state = {}, action){
        switch (action.type) {
            case 'CHANGE_AGE':
                state = action.data
                return state
            default:
                return state
        }
    }
    const reducers = combineReducers({
        name, age
    })
    const store = createStore(
        reducers,
        combineReducersState
    )
    store.dispatch({type: 'CHANGE_AGE', data: 26});
    store.dispatch({type: 'CHANGE_NAME', data: 'zsj123'});
    const nameForState = store.getState().name;
    const ageForState = store.getState().age;
    expect(nameForState).toBe('zsj123');
    expect(ageForState).toBe(26);
})

test('使用组合函数 compose', () => {
    function num1(a, b){
        return a + b
    }
    function num2(c){
        return c + 20 
    }
    // 从右往左执行
    const num = compose(num2, num1)(10, 20)
    expect(num).toBe(50)
})