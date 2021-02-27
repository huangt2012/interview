// map
Array.prototype.map = function (callback, thisArr) {
    if (this === null || this === undefined) {
        throw new TypeError("Cant not read property 'map' of null or undefined");
    }

    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(`${callback} is not a function`)
    }

    const O = Object(this)
    const T = thisArr
    const len = O.length
    const A = new Array(len)
    for (let k = 0; k < len; k++) {
        if (k in O) {
            const mappedValue = callback.call(T, O[k], k, O)
            A[k] = mappedValue
        }
    }
    return A
}

// reduce
Array.prototype.reduce = function (callback, initialValue) {
    if (this === null || this === undefined) {
        throw new TypeError("Cant not read property 'reduce' of null or undefined")
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(`${callback} is not a function`)
    }

    const O = Object(this)
    const len = O.length
    let k = 0
    let accumulator = initialValue
    if (accumulator === undefined) {
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k]
                k++ // 如果没有初始化值，则用第一个元素作为默认值，并从第二个元素开始遍历
                break
            }
        }
    }
    if (accumulator === undefined && k === len) {
        throw new TypeError('Each element of the array is empty')
    }
    for (; k < len; k++) {
        if (k in O) {
            accumulator = callback.call(undefined, accumulator, O[k], k, O)
        }
    }
    return accumulator
}

// push
Array.prototype.push = function (...items) {
    if (this === null || this === undefined) {
        throw new TypeError("Cant not read property 'push' of null or undefined")
    }
    let O = Object(this)
    let len = O.length
    let argCount = items.length
    if (len + argCount > 2 ** 53 - 1) {
        throw new TypeError("The number of array is over the max value restricted!")
    }

    for (let i = 0; i < items.length; i++) {
        O[len + i] = items[i]
    }
    const newLength = len + argCount
    O.length = newLength
    return newLength
}

// pop
Array.prototype.pop = function () {
    let O = Object(this)
    let len = O.len
    if (len === 0) {
        O.length = 0
        return undefined
    }
    len--
    let value = O[len]
    delete O[len]
    O.length = len
    return value
}

// filter
Array.prototype.filter = function (callback, thisArr) {
    if (this === null || this === undefined) {
        throw new TypeError("Cant not read property 'filter' of null or undefined")
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(`${callback} is not a function`)
    }
    let O = Object(this)
    const len = O.length
    let resLen = 0
    const res = []
    for (let i = 0; i < len; i++) {
        if (i in O) {
            let element = O[i]
            if (callback.call(thisArr, element, i, O)) {
                res[resLen++] = element
            }
        }
    }
    return res
}

// splice
function sliceDeleteElements(array, startIndex, deleteCount, deleteArr) {
    for (let i = 0; i < deleteCount; i++) {
        const index = i + startIndex
        if (index in array) {
            deleteArr[i] = array[index]
        }
    }
}

function movePostElements(array, startIndex, len, deleteCount, addElements) {
    const addElementsCount = addElements.length
    // 当插入元素个数和删除元素个数相等时
    if (addElementsCount === deleteCount) return
    // 当插入元素少于删除元素时，后面的元素往前面挪动
    if (addElementsCount < deleteCount) {
        // 后面的元素: [startIndex + deleteCount ... len - 1]
        // 后面的元素往前挪动：deleteCount - addElements.length 个单位
        for (let i = startIndex + addElements.length; i < len; i++) {
            const fromIndex = i
            const toIndex = i - (deleteCount - addElementsCount)
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete array[toIndex]
            }
        }
        // 后面的元素往前挪动，相当于元素减少了，需要删除多余的数据
        for (let i = len - 1; i >= len + addElementsCount - deleteCount; i--) {
            delete array[i]
        }
    } else {
        // 插入元素多于删除元素，后面的元素往后挪动
        // 后面的元素：[startIndex + deleteCount ... len - 1]
        // 后面的元素依次往后挪动 addElementsCount - deleteCount 个单位
        for (let i = len - 1; i >= startIndex + deleteCount; i--) {
            const fromIndex = i
            const toIndex = i + addElementsCount - deleteCount
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete (array[toIndex])
            }
        }
    }
}

function computeStartIndex(startIndex, len) {
    if (!startIndex) return 0
    if (startIndex < 0) {
        return startIndex + len > 0 ? startIndex + len : 0
    }
    return startIndex > len ? len : startIndex
}

function computeDeleteCount(startIndex, deleteCount, len, argumentsLen) {
    // 删除数目没有传，默认删除startIndex后面的全部元素
    if (argumentsLen === 1) {
        return len - startIndex
    }
    if (deleteCount < 0) return 0
    if (deleteCount > len - startIndex) {
        return len - startIndex
    }
    return deleteCount
}

Array.prototype.splice = function (startIndex, deleteCount, ...addElements) {
    if (this === null || this === undefined) {
        throw new TypeError("Cant not read property 'filter' of null or undefined")
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(`${callback} is not a function`)
    }

    const argumentsLen = arguments.length
    const array = Object(this)
    const len = array.length
    const deleteArr = new Array(deleteCount)
    startIndex = computeStartIndex(startIndex, len)
    deleteCount = computeDeleteCount(startIndex, deleteCount, len, argumentsLen)

    if (Object.isSealed(array) && deleteCount !== addElements.length) {
        // 密封对象，不允许添加、删除方法和属性，但可以修改属性值
        throw new TypeError('the object is a sealed object')
    } else if (Object.isFrozen(array) && (deleteCount > 0 || addElements.length > 0)) {
        // 冻结对象，不允许添加、删除方法和属性，不可以修改属性值
        throw new TypeError('the object is frozen object')
    }
    // 拷贝删除的元素
    sliceDeleteElements(array, startIndex, deleteCount, deleteArr)
    // 移动删除元素后面的元素
    movePostElements(array, startIndex, len, deleteCount, addElements)
    // 插入新元素
    for (let i = 0; i < addElements.length; i++) {
        array[startIndex + i] = addElements[i]
    }
    array.len = len + addElements.length - deleteCount
    return deleteArr
}

/**
 * 当 n < 10 使用插入排序
 * 当 n > 10 采用三路快排
 *  当 10 < n <= 1000：使用中位数作为哨兵元素
 *  当 n > 1000: 每隔200~215选一个元素，放到一个新的数组中，对它进行排序然后找到中位数
 */
Array.prototype.sort = function(compareFn) {
    let arr = Object(this)
    const len = arr.length
    return InnerArraySort(arr, len, compareFn)
}

function InnerArraySort(arr, len, compareFn) {
    // 未传入compareFn
    if (Object.prototype.toString.call(compareFn) !== '[object Function]') {
        compareFn = function(x, y) {
            if (x === y) return 0
            x = x.toString()
            y = y.toString()
            if (x === y) return 0
            return x < y ? -1 : 1
        }
    }

    const insertionSort = (arr, startIndex, endIndex) => {
        startIndex = startIndex || 0
        endIndex = endIndex || arr.length - 1
        for (let i = startIndex + 1; i <= endIndex; i++) {
            const e = arr[i]
            let j = i
            while (j > startIndex && arr[j - 1] > arr[j]) {
                arr[j] = arr[j--]
            }
            arr[j] = e
        }
    }

    const getThirdIndex = () => {
        let tempArr = []
        // 增量200~215 之间，因为任何正数与15操作不会超过15
        let increment = 200 + ((to - from) & 15)
        let j = 0
        from += 1
        to -= 1
        for (let i = from; i < to; i += increment) {
            tempArr[j] = [i, arr[i]]
            j++
        }
        // 临时数组排序
        tempArr.sort((a, b) => comparefn(a[1], b[1]))
        let thirdIndex = tmpArr[tmpArr.length >> 1][0]
        return thirdIndex
    }

    const quickSort3Ways = (arr, l, r, thirdIndex) => {
        if (r - l <= 15) {
            insertionSort(arr, l, r)
            return
        }
        arr[thirdIndex] = arr[l]
        arr[l] = temp
        const v = arr[l]
        let lt = l // arr[l+1...lt] < v
        let gt = r + 1 // arr[gt...r] > v

        let i = l // arr[lt+1...i) === v
        while (i < gt) {
            if (arr[i] < v) {
                [arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]]
                lt++
                i++
            } else if (arr[i] > v) {
                [arr[i], arr[gt - 1]] = [arr[gt - 1], arr[i]]
                gt--
                // 这里i的位置不需要动，因为从后面放了一个元素过来
            } else {
                i++
            }
        }
        [arr[l], arr[lt]] = [arr[lt], arr[l]]
        quickSort3Ways(arr, l, lt - 1)
        quickSort3Ways(arr, gt, r)

    }

    const quickSort = (arr, left, right) => {
        let thirdIndex = 0
        while(true) {
            if (right - left <= 10) {
                insertionSort(arr, left, right)
                return
            }
            if (right - left > 1000) {
                thirdIndex = getThirdIndex()
            } else {
                // 小于1000 直接取中间点
                thirdIndex = Math.floor((right - left )/ 2)
            }
            quickSort3Ways(arr, left, right, thirdIndex)
        }
    }
    quickSort(arr, 0, length - 1)

}
