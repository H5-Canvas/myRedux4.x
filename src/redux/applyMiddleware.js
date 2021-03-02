import compose from './compose';
export default function applyMiddleware(...middlewares){
    // 我们查看 thunk 源码的时候 看到这样一段 
    // return ({ dispatch, getState }) => next => action =>
    // 那么我们可以很明显的看出 thunk 中间件的第一个参数 也就是 store 
    // 那么这个 store 是如何创建的呢 我们看这里
    return createStore => (...args) => {
        // args => reducer, preloadedState
        const store = createStore(...args);
        // 我们在使用 applyMiddleware 的时候 都知道传入的 中间件执行顺序是从右往左
        // 什么意思呢 我们先要通过 中间件来判断 action 然后将执行的结果传入倒下一个中间件
        // 那么它是如何实现的呢
        // 我们都知道 修改state状态必须要通过 dispatch 派发 action 到 reducer 然后返回修改后的结果并赋值
        // 那么我们就可以看到了 第一步就是 dispatch
        // 源码中 定义了一个新的 dispatch 来替换老的 dispatch
        // 为什么这么做呢 因为老的 dispatch 会直接走 reducer 而不走 中间件了 所以我们这里需要重新定义并替换
        let dispatch = () => {}
        // 然后我们再定义中间件需要暴露的 api
        const middlewareApi = {
            getState: store.getState(),
            dispatch: (...args) => dispatch(...args)
        }
        // 之后我们来获取 整合之后的 middlewares 数组 
        // 也就是中间件源码中 next => 后的内容
        const chain = middlewares.map(middleware => middleware(middlewareApi));
        // 然后我们接着来看 thunk 中 next => action 那么这个next对应的就是我们的 dispatch 方法
        // compose 组合式函数 
        dispatch = compose(...chain)(store.dispatch);
        // 打印出来的就是 thunk 后的 action => 
        // console.log(dispatch)

        // 好了 那么我们现在已经拿到了 最终的内容 action => 我们现在就返回 我们需要把中间件创建的 store 以及最红的内容 action 返回给根 store
        return {
            ...store,
            dispatch
        }
    }
}