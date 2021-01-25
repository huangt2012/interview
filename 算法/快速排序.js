

/**
 * 快速排序的优化点
 * 优化点一：递归跳出条件，当元素少到一定数量时，使用插入排序
 * 优化点二：快速排序获取基数v将数组一分为二，对于归并排序，始终都是均分的，但是快速排序可能会出现一大一小的情况，
 * 当数组近乎有序时，如果单纯使用arr[l]获取基数v，就会获取到极度不平衡的两个数组，最差的情况会退化到O(n^2)
 * 对应的优化的方法时在选择v时不再单纯使用第一个元素作为基数，而是随机选择一个
 * 当随机选择v时，快速排序的时间复杂度将基本为o(nlogn),因为每次选择v时刚好选中最小的那个元素的概率很低：1/n * 1/(n-1)*...1/2* 1
  
 */

/**
 * 对arr[l...r]部分进行partition操作
 * 返回p，使得arr[l...p -1] < arr[p]; arr[p + 1...r] > arr[p]
 * @param {*} arr 
 * @param {*} l 
 * @param {*} r 
 */
function __partition(arr, l, r) {
  // const v = arr[l]
  // 优化点二：
  const randomIndex = parseInt(Math.random() * (r - l + 1) + l, 10)
  const v = arr[randomIndex]
  let j = l
  // arr[l+1...j] < v; arr[j+1... i) > v
  for (let i = l + 1; i <= r; i++) {
    // arr[i] > v 只需要i++
    if (arr[i] < v) {
      [arr[j + 1], arr[i]] = [arr[i], arr[j + 1]]
      j++
    }
  }
  [arr[l], arr[j]] = [arr[j], arr[l]]
  return j
}


// 对arr[l...r]部分进行快速排序
function __quickSort(arr, l, r) {
  // if (l >= r) {
  //   return
  // }
  if (r - l <= 15) {
    insertionSortRange(arr, l, r)
    return
  }
  const p = __partition(arr, l, r)
  __quickSort(arr, l, p - 1)
  __quickSort(arr, p + 1, r)
}


function quickSort(arr) {
  __quickSort(arr, 0, arr.length - 1)
}