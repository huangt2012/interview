function selectionSort(arr) {
  const { length } = arr
  for (let i = 0; i < length - 1; i += 1) {
    let minIndex = i
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
}