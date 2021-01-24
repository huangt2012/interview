/**
 * 生成随机数组
 * @param {*} n 
 * @param {*} rangeL 
 * @param {*} rangeR 
 */
    function generateRandomArray(n, rangeL, rangeR) {

    const result = []

    for (let i = 0; i < n; i++) {

        result[i] = parseInt(Math.random() * (rangeR - rangeL + 1) + rangeL, 10)

    }

    return result

}

/**
 * 生成近乎有序的数组
 * @param {*} n 
 * @param {*} swapTimes 
 * @param {*} reverse 
 */
function generateNearlyOrderedArray(n, swapTimes, reverse = false) {

    const arr = []

    for (let i = 0; i < n; i++) {

        arr[i] = reverse ? n - i : i

    }

    for (let i = 0; i < swapTimes; i++) {

        const intX = Math.random() * n

        const intY = Math.random() * n

        const temp = arr[intX]

        arr[intX] = arr[intY]

        arr[intY] = temp

    }

    return arr

}

/**
 * 测试排序算法
 * @param {*} sort 
 * @param {*} arr 
 * @param {*} sortName 
 */
function testSort(sort, arr, sortName) {
    console.time(sortName)
    sort(arr)
    console.timeEnd(sortName)
    if (arr.length < 100) {
        console.log(arr)
    }
}