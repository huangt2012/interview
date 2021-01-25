function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 寻找元素arr[i]合适的插入位置
    const curr = arr[i]
    let prevIndex = i
    while (prevIndex > 0 && arr[prevIndex - 1] > curr) {
      arr[prevIndex] = arr[prevIndex - 1]
      prevIndex--
    }
    arr[prevIndex] = curr
  }
}