
function bubbleSort(arr) {
    const { length } = arr
    for (let i = 0; i < length - 1; i++) {
        let swapped = false
        for (let j = 0; j < length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                swapped = true
            }
        }
        if (!swapped) {
            break
        }
    }
}

function bubbleSort1(arr) {
    let { length } = arr
    let swapped = false
    do {
        swapped = false
        for (let i = 1; i < length; i++) {
            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
                swapped = true
            }
        }
        length--
    } while (swapped);
}

function bubbleSort2(arr) {
    let len = arr.length
    let newLen = 0
    do {
        newLen = 0
        for (let i = 1; i < len; i++) {
            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
                newLen = i // 记录最后一次交换位置，在此之后的元素在下一轮中不考虑
            }
        }
        len = newLen
    } while (len > 0)
}