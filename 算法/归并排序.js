

/**
 * 将arr[l...mid]和arr[mid+1...r]两个部分进行归并
 * @param {*} arr 
 * @param {*} l 
 * @param {*} mid 
 * @param {*} r 
 */
function __merge(arr, l, mid, r) {
  // 新增一个数组存储需要归并的数据arr[l...r]
  const aux = []
  for (let i = l; i <= r; i++) {
    aux[i - l] = arr[i]
  }
  let i = l // i指向左边有序数列的第一位
  let j = mid + 1 // j指向右边有序数列的第一位
  for (let k = l; k <= r; k++) {
    // 对[l...r]区间内的元素做处理
    if (i > mid) {
      // 左边的元素已经归并完了，需要将右边的元素放入数组中
      arr[k] = aux[j - l]
      j++
    } else if (j > r) {
      arr[k] = aux[i - l]
      i++
    } else if (aux[i - l] < aux[j - l]) {
      arr[k] = aux[i - l]
      i++ //左边的元素较小
    } else {
      arr[k] = aux[j - l]
      j++
    }
  }
}

/**
 * 递归使用归并排序，对arr[l...r]的范围进行排序
 * 归并排序主要的优化点：
 * 优化一：增加判断条件arr[mid] > arr[mid+1] 的判断，对于近乎有序的数组有比较明显的变化
 * 优化二：对于递归到底的条件判断
 * @param {*} arr 
 * @param {*} l 
 * @param {*} r 
 */
function __mergeSort(arr, l, r) {
  // if (l >= r) {
  //   // 在l小于r时，说明还有两个元素
  //   return
  // }
  if (r - l <= 15) {
    // 当数组数量少到一定程度时，插入排序要比归并排序快，时间复杂度前面是由系数的
    // 当数量少到一定程度时，调用插入排序进行排序
    insertionSortRange(arr, l, r)
    return
  }
  const mid = Math.floor((l + r) / 2) // 可能存在的问题，当l和r都很大时，l + r可能会产生溢出
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  // __merge(arr, l, mid, r)
  // 优化点一：
  // 如果arr[mid] <= arr[mid+1], 说明数组已经是有序的了，因为归并时两边的已经是有序的序列，如果mid <= mid + 1，左边的序列的元素肯定都小于右边的序列
  // 通过这一优化，对于近乎有序的数组，性能提升，但是想比较与插入排序，所花时间还是比较多，因为归并排序无法退化成O(n)的算法，归并排序始终需要进行logn次递归
  if (arr[mid] > arr[mid + 1]) {
    __merge(arr, l, mid, r)
  }
}

function mergeSort(arr) {
  __mergeSort(arr, 0, arr.length - 1)
}