
/**
 * 
 bind 处理的事情：
 对于普通函数，绑定this 指向
 对于构造函数， 要保证原函数的原型对象上的属性不能丢失
 */
Function.prototype.bind = function(context, ...args) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    const self = this
    const FNOP = function() {}
    const fbound = function() {
        self.apply(
            this instanceof self ? this : context,
            args.concat(Array.prototype.slice.call(arguments))
            )
    }
    FNOP.prototype = this.prototype
    fbound.prototype = new FNOP()
    return fbound
}

Function.prototype.call = function(context, ...args) {
    let context = context || window
    let fn = Symbol('fn')
    context.fn = this

    let result = eval('context.fn(...args)')
    delete context.fn
    return result
}

