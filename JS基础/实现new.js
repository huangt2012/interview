function newOperator(ctor, ...arguments) {
    if (typeof ctor !== 'function') {
        throw new TypeError('newOperator function the first param must be a function')
    }
    const obj = Object.create(ctor.prototype)
    const res = ctor.call(obj, ...arguments)
    return typeof res === 'object' && res !== null || typeof res === 'function' ? res : obj
}