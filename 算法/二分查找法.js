function binarySearch(arr, target) {
    let left = 0
    let right = arr.length - 1
    while (left <= right) {
        // const mid = Math.floor((right + left) / 2)
        const mid = Math.floor((right - left) / 2) + left // 避免整型溢出
        if (arr[mid] === target) {
            return mid
        } else if (arr[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }

    }
    return -1
}

