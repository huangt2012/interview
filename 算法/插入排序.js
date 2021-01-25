function insertionSort(arr) {
  insertionSortRange(arr, 0, arr.length - 1)
}

/**
 * 对 arr[l...r]范围的数组进行插入排序
 * @param {*} arr 
 * @param {*} l 
 * @param {*} r 
 */
function insertionSortRange(arr, l, r) {
  for (let i = l + 1; i <= r; i++) {
    const e = arr[i]
    let j = i
    while (j > l && arr[j - 1] > e) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = e
  }
}
