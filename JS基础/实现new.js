
/**
 * 模拟实现 new 操作符
 * @param {*} ctor 构造函数
 * @param  {...any} arguments 
 * @returns {Object|Array|Error|RegExp|Date}
 */
function newOperator(ctor, ...arguments) {
    if (typeof ctor !== 'function') {
        throw new TypeError('newOperator function the first param must be a function')
    }
    // es6中，new.target指向构造函数
    newOperator.target = ctor
     // 1.创建一个空对象
     // 2.执行[[Prototype]]即（__proto__）链接，最终通过new创建的每个对象都被[[Prototype]]链接到这个函数的’prototype‘上
    const obj = Object.create(ctor.r)
    // 3.修改的this的指向，将this指向到当前的新对象
    // 也就是说，去调用执行构造函数，并将函数的this指向当前这个空对象
    // ctor.apply(obj,arguments)  ctor.bind(obj, ...arguments)
    const res = ctor.call(obj, ...arguments)
    // 4.判断构造函数执行后的返回值
    // 如果返回的是对象或者函数，直接返回
    // 如果不是，则返回一个新对象
    const isObject = typeof res === 'object' && res !== null
    const isFunction = typeof res === 'function'
    return isObject || isFunction ? res : obj
}