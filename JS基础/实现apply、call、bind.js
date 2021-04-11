
/**
 * 
 bind 处理的事情：
 对于普通函数，绑定this 指向
 对于构造函数， 要保证原函数的原型对象上的属性不能丢失
 1.bind是Function原型链中Function.prototype 的一个属性，么个函数都可以调用
 2.bind是一个函数名为bind的函数，返回值也是函数，名为bound
 typeof Function.prototype.bind === 'function'
 typeof Function.prototype.bind() === 'function'
 typeof Function.prototype.bind.name === 'bind'
 typeof Function.prototype.bind().name === 'bound'

    bind方法会创建一个新的函数
    当这个新的函数被调用时，bind()的第一个参数作为它运行时的this
    之后的一系列参数将会在传递的实参前传入作为它的参数
 */
Function.prototype.bind = function(context, ...args) {
    // 一定要是函数调用
    if (typeof this !== "function") {
        throw new Error(`${this} must be a function`);
    }
    // 存储函数本身
    const self = this

    
    const bound = function(...boundArgs) {
        // args: 是执行bind时，传入的第二个开始的一系列的参数
        // boundArgs: 是执行bind后返回的boun函数，执行bound函数传入的参数
        // 当作为构造函数时，this 指向实例，self 执行绑定函数，通过 'bound.prototype = this.prototype' 将bound的prototype指向了绑定函数
        // 当作为普通函数时，this 指向window
        return self.apply(this instanceof self ? this : context, args.concat(boundArgs))
    }
    // 针对构造函数，修改返回函数的prototype为绑定函数的prototype，这样实例就可以继承函数的原型对象
    // bound.prototype = this.prototype // 如果直接这么写，修改bound.prototype时也会修改this.prototype
    // 用一个空函数中转
    var fNOP = function() {}
    fNOP.prototype = this.prototype
    bound.prototype = new fNOP()
    return bound
}

Function.prototype.call = function(context, ...args) {
    let context = context || window
    let fn = Symbol('fn')
    context.fn = this

    let result = eval('context.fn(...args)')
    delete context.fn
    return result
}

