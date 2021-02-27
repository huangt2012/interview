/**
 * Promise 凭借什么消灭回调地狱
 * 什么是回调地狱？；
 * 1）多层嵌套的问题
 * 2）每种任务的处理结果存在两种可能性，成功或失败，需要在每种任务执行结束后分别对这两种情况分别处理
 * 如何解决：Promise利用三大技术手段解决回调地狱的问题
 * 1）回调函数的延迟绑定
 * 2）返回值穿透
 * 3）错误冒泡
 */

// Promise 本质是有限状态机，总共有三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Bromise(executor) {
    let self = this
    self.value = null
    self.error = null
    self.status = PENDING
    self.onFulFilled = null // 成功的回调
    self.onRejected = null // 失败的回调
    self.onFulFilledCallBacks = []
    self.onRejectedCallBacks = []

    const resolve = (value) => {
        if (self.status !== PENDING) return
        setTimeout(() => {
            self.status = FULFILLED
            self.value = value
            // self.onFulFilled(self.value) // resolve时执行成功回调
            self.onFulFilledCallBacks.forEach((callback) => callback(self.value))
        }, 0)
    }

    const reject = (error) => {
        if (self.status !== PENDING) return
        setTimeout(() => {
            self.status = REJECTED
            self.error = error
            // self.onRejected(self.error)
            self.onRejectedCallBacks.forEach((callback) => callback(self.value))
        }, 0)
    }
    executor(resolve, reject)
}

function resolvePromise(bridgePromise, x, resolve, reject ) {
    if (x instanceof Bromise) {
        if (x.status === PENDING) {
            x.then(
                (y) => resolvePromise(bridgePromise, y, resolve, reject),
                (error) => reject(error)
            )
        } else {
            x.then(resolve, reject)
        }
    } else {
        resolve(x)
    }
}

Bromise.prototype.then = function (onFulFilled, onRejected) {
    // 回调函数不传
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
    let self = this
    let bridgePromise = null
    if (this.status === PENDING) {
        //  this.onFulFilledCallBacks.push(onFulFilled)
        //  this.onRejectedCallBacks.push(onRejected)
        return bridgePromise = new Bromise((resolve, reject) => {
            self.onFulFilledCallBacks.push((value) => {
                try {
                    // 拿到then中回调函数的结果
                    let x = onFulFilled(value)
                    // resolve(x)
                    resolvePromise(bridgePromise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }

            })
            self.onRejectedCallBacks.push((error) => {
                try {
                    let x = onRejected(error)
                    // resolve(x)
                    resolvePromise(bridgePromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    } else if (this.status === FULFILLED) {
        // onFulFilled(this.value)
        return bridgePromise = new Bromise((resolve, reject) => {
            try {
                let x = onFulFilled(self.value)
                resolvePromise(bridgePromise, x, resolve, reject)
            } catch (error) {
                reject(error)
            }
        })
    } else {
        // onRejected(this.error)
        return bridgePromise = new MyPromise((resolve, reject) => {
            try {
                // 状态变为失败，会有相应的 self.error
                let x = onRejected(self.error);
                resolvePromise(bridgePromise, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        })
    }
}

Bromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}

/**
 * 
 * resolve 静态方法的特点
 * 1.传入一个Promise,直接返回
 * 2.传入的是一个thenable对象，返回的promise对象会跟随这个对象，使用它的最终状态作为自己的状态
 * 3.其他情况则返回以该值为成功状态的promise对象
 */
Bromise.prototype.resolve = function(value) {
    if (value instanceof Bromise) return value
    return new Bromise((resolve, reject) => {
        if (value && typeof value.then === 'function') {
            value.then(resolve, reject)
        } else {
            resolve(value)
        }
    })
}

/**
 * reject 中传入的reason会原封不动往下传
 */
Bromise.prototype.reject = function(reason) {
    return new Bromise((resolve, reject) => reject(reason))
}

/**
 * 
 * 无论当前成功还是失败，调用finally后，都会执行finally中传入的函数，并将值原封不动往下传 
 */
Bromise.prototype.finally = function(callback) {
    this.then((value) => {
        return Bromise.resolve(callback()).then(() => {
            return value
        })
    }, (error) => {
        return Bromise.reject(callback()).then(() => {
            throw error
        })
    })
}
/**
 * 实现Promise.all
 * 对于all，有三大核心功能
 * 1.如果传入的是一个空的可迭代对象，则直接resolve
 * 2.如果参数中有一个promise失败，则返回promise对象失败
 * 3.任何情况下返回的promise的完成状态的结果是一个数组
 */
Bromise.prototype.all = function(promises) {
    return new Bromise((resolve, reject) => {
        let result = []
        const len = promises.length
        let index = 0
        if (len === 0) {
            resolve(result)
            return
        }
        for(let i = 0; i < len; i++) {
            // 不直接promises[i].then()是因为可能不是promise对象
            Bromise.resolve(promises[i]).then((data) => {
                result[i] = data
                index++
                if (index === len) resolve(result)
            }).catch((err) => {
                reject(err)
            })
        }
    })
}

/**
 * 实现promise.race
 * 只要有一个promise执行完成，直接reject
 */
Bromise.prototype.race = function(promises) {
    return new Bromise((resolve, reject) => {
        const len = promises.length
        if (len === 0) return
        for (let i = 0; i < len; i++) {
            Bromise.resolve(promises[i]).then((data) => {
                resolve(data)
                return
            }).catch((err) => {
                reject(err)
                return
            })
        }
    })
}
