/**
 * 浅拷贝的实现方式
 * 1.手动实现: shallowClone
 * 2.Object.assign({}, target)
 * 3.concat/slice浅拷贝数组：newArr = targetArr.concat()/ newArr = targetArr.slice()
 * 4.展开运算符：newArr = [...targetArr]
 */

function shallowClone(target) {
    if (typeof target === 'object' && target !== null) {
        const result = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (target.hasOwnProperty(key)) {
                result[key] = target[key]
            }
        }
        return result
    }
    return target
}

function cloneWithAssign() {
    const target = { name: 'Tome', age: 11 }
    const result = Object.assign({}, target, { name: 'hhhh' })
    console.log(result) // {name: 'hhhh', age: 11}
    return result
}

/**
 * 深拷贝的实现
 * 1.简易版：JSON.parse(JSON.stringify());
 * 2.deepClone     
 *       
 */

function cloneWithJSON(target) {
    const result = JSON.parse(JSON.stringify(target))
    /**
     * 存在问题
     * 1）无法解决循环引用问题,如拷贝a，则会出现栈溢出问题，因为出现了无限递归的情况
     * 2) 无法拷贝一些特殊对象，如Math、RegExp、Date、Set、Map等
     * 3）无法拷贝函数
     */
    const a = { name: 'a' }
    a.target = a
    return result
}

/**
 * 1.解决循环调用问题：使用map记录已经拷贝过得对象
 *   但如果直接用Map，map上的key和map构成了强引用关系，强引用和弱引用是相对的
 *   其中弱引用的对象可以在任何时候被垃圾回收器回收，而如果是强引用，只要这个强引用还在，内存就不会被释放
 *   解决办法：使用weakMap，weakMap是一种特殊的Map，其中的建是弱引用的，且必须为对象
 * 2.拷贝特殊对象
 * 3.拷贝函数
 */
const isObject = (target) => typeof target === 'object' || typeof target === 'function'
const getType = (target) => Object.prototype.toString.call(target)
const canTraverse = new Set([
    '[object Map]',
    '[object Set]',
    '[object Array]',
    '[object Object]',
    '[object Arguments]'
])

const notTraverse = new Set([
    '[object Boolean]',
    '[object Number]',
    '[object String]',
    '[object Date]',
    '[object Error]',
    '[object RegExp]',
    '[object Function]'
])

const handleFunc = (target) => {
    // 拷贝函数
    // 普通函数和箭头函数不一样，每个普通函数都是Funtion的实例
    // 箭头函数不是任何类的实例，每次调用都是不一样的引用
    // 所以只需要处理普通函数即可
    // 如何区分箭头函数和普通函数 =》 使用原型，箭头函数没有原型
    if (!target.prototype) return target
    const bodyReg = /(?<={)(.|\n)+(?=})/m
    const paramReg = /(?<=\().+(?=\)\s+{)/
    const funcString = target.toString()
    // 分别匹配参数和函数体
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (!body) return null
    if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
    } else {
        return new Function(body[0])
    }
}

const handleNotTraverse = (target, type) => {
    const Ctor = target.constructor
    switch (type) {
        case '[object Boolean]':
            return new Object(Boolean.prototype.valueOf.call(target))
        case '[object Number]':
            return new Object(Number.prototype.valueOf.call(target))
        case '[object String]':
            return new Object(String.prototype.valueOf.call(target))
        case '[object Error]':
        case '[object Date]':
            return new Ctor(target)
        case '[object RegExp]':
            const { source, flags } = target
            return new Ctor(source, flags)
        case '[object Function]':
            return handleFunc(target)
        default:
            return new Ctor(target)
    }
}

function deepClone(
    target,
    //   map = new Map()
    map = new WeakMap()
) {
    if (!isObject(target)) return target
    const type = getType(target)
    let cloneTarget
    if (!canTraverse.has(type)) {
        // 处理不能遍历的对象
        return handleNotTraverse(target, type)
    } else {
        // 确保对象的原型不丢失
        const ctor = target.constructor
        cloneTarget = new ctor()
    }
    if (map.get(target)) {
        return target
    }
    map.set(target, true)

    if (type === '[object Map]') {
        // 处理map
        target.forEach((item, key) => {
            cloneTarget.set(deepClone(key, map), deepClone(item, map))
        })
    }
    if (type === '[object Set]') {
        // 处理set
        target.forEach((item) => {
            cloneTarget.add(deepClone(item, map))
        })
    }
    // 处理数组和对象
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop], map)
        }
    }
    return cloneTarget
}