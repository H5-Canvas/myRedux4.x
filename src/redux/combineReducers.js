
export default function combineReducers(reducers){
    // 获取 reducers 对象上的 key
    const reducersKey = Object.keys(reducers);
    // 创建一个最终要处理的 reducers
    const finalReducers = {};
    reducersKey.forEach(key=>{
        finalReducers[key] = reducers[key]
    })
    return function combination(state = {}, action){
        // 判断 state 是否变化
        let hasChanged = false;
        // 创建修改后的 state 值保存
        let nextState = {};
        // 注意 reducerKey 中的 key 必须与你传入的 state key 相同
        reducersKey.forEach(key=>{
            const reducer = finalReducers[key];
            // 获取之前的 state 状态
            const prevStateForKey = state[key];
            // 然后在获取最新的 state 状态
            const nextStateForKey = reducer(prevStateForKey, action);
            // 给最新的 state 状态赋值
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey != prevStateForKey
        })
        // 然后在返回最新的 state 状态
        return hasChanged ? nextState : state
    }
}