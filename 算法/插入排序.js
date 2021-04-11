
/**
 * 对 arr[startIndex...endIndex] 范围的数组进行插入排序
 * @param {*} arr 
 * @param {*} startIndex 
 * @param {*} endIndex 
 */
function insertionSort(arr, startIndex, endIndex) {
  startIndex = startIndex || 0
  endIndex = endIndex || arr.length - 1
  console.log(startIndex, endIndex)
  for (let i = startIndex + 1; i <= endIndex; i++) {
    const e = arr[i]
    let j = i
    while (j > startIndex && arr[j - 1] > e) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = e
  }
  console.log('insertion,', arr)
}