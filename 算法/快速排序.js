

/**
 * 快速排序的优化点
 * 1.优化点一：递归跳出条件，当元素少到一定数量时，使用插入排序
 * 
 * 2.优化点二：快速排序获取基数v将数组一分为二，对于归并排序，始终都是均分的，但是快速排序可能会出现一大一小的情况，
 * 当数组近乎有序时，如果单纯使用arr[l]获取基数v，就会获取到极度不平衡的两个数组，最差的情况会退化到O(n^2)
 * 对应的优化的方法时在选择v时不再单纯使用第一个元素作为基数，而是随机选择一个
 * 当随机选择v时，快速排序的时间复杂度将基本为o(nlogn),因为每次选择v时刚好选中最小的那个元素的概率很低：1/n * 1/(n-1)*...1/2* 1
 * 
 * 3.优化点三：当数组中包含大量重复的数据的时候，不管怎么选择基数，都极有可能将数组分为极度不平衡的两部分，时间复杂度也极有可能退化到O(n^2)
 * 解决方案：
 *  1.使用双路快速排序  
 *  2.使用三路快速排序：将数组分为三部分：小于v的，等于v，大于v
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
  [arr[randomIndex], arr[l]] = [arr[l], arr[randomIndex]] // 交换第一个元素和随机一个元素，确保基数随机
  const v = arr[l]
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

function __partition2(arr, l, r) {
  const randomIndex = parseInt(Math.random() * (r - l + 1) + l, 10)
  const temp = arr[randomIndex]
  arr[randomIndex] = arr[l]
  arr[l] = temp
  const v = arr[l]
  // arr[l...i) <= v;  arr(j...r] >= v
  let i = l + 1
  let j = r
  while (true) {
    while (arr[i] < v && i <= r) i++
    while (arr[j] > v && j >= l) j--
    if (i > j) {
      break
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
    i++
    j--
  }
  [arr[l], arr[j]] = [arr[j], arr[l]]
  return j
}

// 对arr[l...r]部分进行快速排序
function __quickSort2(arr, l, r) {
  if (r - l <= 15) {
    insertionSortRange(arr, l, r)
    return
  }
  const p = __partition2(arr, l, r)
  __quickSort2(arr, l, p - 1)
  __quickSort2(arr, p + 1, r)
}


function quickSort2(arr) {
  __quickSort2(arr, 0, arr.length - 1)
}

/**
 * 三路快速排序 arr[l...r]
 * 将arr[l...r]分为 <v; =v 和 >v
 * 之后递归处理<v;>v的部分
 * @param {*} arr 
 * @param {*} l 
 * @param {*} r 
 */
function __quickSort3Ways(arr, l, r) {
  if (r - l <= 15) {
    insertionSortRange(arr, l, r)
    return
  }

  // partition
  const randomIndex = parseInt(Math.random() * (r - l + 1) + l, 10)
  const temp = arr[randomIndex]
  arr[randomIndex] = arr[l]
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
  __quickSort3Ways(arr, l, lt - 1)
  __quickSort3Ways(arr, gt, r)

}
function quickSort3Ways(arr) {

  __quickSort3Ways(arr, 0, arr.length - 1)
}

