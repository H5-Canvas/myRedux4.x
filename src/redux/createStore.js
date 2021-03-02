import { isObject, isFunction, isUndefined } from './utils';
/**
 * @param reducer 用户写入的 reducer 纯函数
 * @param preloadedState 用户传入的默认的 state 状态
 * @param enhancer 用户传入的 redux 插件
*/
export default function createStore(reducer, preloadedState, enhancer){
    // 首先 第一步 我们先对参数进行类型判断处理
    // 我们在使用过程中 可以看到基本上是这样写的 createStore(reducer, applyMiddleware()) 
    // 在源码中 我们先会判断 preloadedState 是否为一个函数并且 enhancer 没有定义 那么我们就会将 preloadedState 赋值到 enhancer 上
    // 并且将 preloadedState 赋值为 undefined 做好参数的对应处理
    if( isFunction(preloadedState) && isUndefined(enhancer) ){
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    // 第二步 我们首先要知道 如果说我们传入的 preloadedState 也就是现在的 enhancer 是一个函数类型，那么就说明我们传入的是 
    // applyMiddleware() 这个函数
    // 那么我们就开始处理这种情况
    if( !isUndefined(enhancer) ){
        if( !isFunction(enhancer) ){
            throw new Error('报错')
        }
        // 这里的调用 我们会在讲解 redux 中间件的时候细讲 为什么要这么去调用
        return enhancer(createStore)(reducer, preloadedState)
    }
    let isDipatching = false;
    let currentState = preloadedState;
    let currentReducer = reducer;
    let listenerStack = []
    // 第三步 我们熟知的 在 store = createStore() 被调用之后，我们可以有几个 API 可以使用
    // 分别是 getState subscribe dispatch replaceReducer 这几个 API
    // 好了 我们先来定义这几个函数
    function getState(){  // 获取 state 状态
        // 当我们在修改状态中 是无法获取 state 状态的
        if( isDipatching ) throw new Error('...')
        return currentState
    }
    function subscribe(listener){  // 添加订阅事件 监听 state 变化
        // 也就是说 当我们的 state 状态更新了 就马上调用这个回调函数执行 所以就很想我们的发布订阅模式
        // 现在我们就来实现一下发布订阅模式
        // 添加到 listener 栈中 实现订阅的功能
        listenerStack.push(listener)
    }
    function dispatch(action){  // 提交 action 
        // 我们都知道 redux 的流程就是通过 dispatch 派发 action 到 reducer 中，然后通过 reducer 条件判断返回最新的 state 
        // 这里我们就拿到了最新的 state 
        // 我们为了保证一次调用只能修改一次状态 所以给每次的修改 添加一个锁
        // 为了确保 用户书写的 reducer 函数传入后 保证程序正常执行 我们使用 try catch
        try {
            isDipatching = true
            currentState = currentReducer(currentState, action);
        }finally{
            isDipatching = false
        }
        // 当我们修改完毕 就将 listener 栈中的函数依次触发就好了
        listenerStack.forEach(listener => listener())
        return action
    }
    function replaceReducer(nextReducer){  // 替换原有 reducer 改变原有的 state 状态结构
        currentReducer = nextReducer;
    }
    
    return {
        getState,
        subscribe,
        dispatch,
        replaceReducer
    }
}