
export default function compose(...funcs){
    if( funcs.length === 0 ){
    	return arg => arg
    }
    if( funcs.length === 1 ){
    	return funcs[0]   
    }
    // 它的核心就是调用了 Array.prototype.reduce
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}