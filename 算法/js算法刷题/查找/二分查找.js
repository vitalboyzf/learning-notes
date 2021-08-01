function binarySearch(data, arr, start, end) {
    if (start >= end) return -1;
    if (!start) start = 0;
    if (!end) end = arr.length - 1;
    let middle = Math.floor((start + end) / 2);
    if (arr[middle] === data) {
        // 找到了
        return middle;
    } else if (arr[middle] > data) {
        // 在左边
        return binarySearch(data, arr, start, middle - 1);
    } else {
        // 在右边
        return binarySearch(data, arr, middle + 1, end);
    }
}

function binarySearch_while(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target === arr[mid]) {
            return mid;
        } else if (target > arr[mid]) {
            // 在右边
            left = mid + 1;
        } else {
            // 在左边
            right = mid - 1;
        }
    }
    return -1;
}
console.log(binarySearch_while([1, 3, 5, 7, 9, 23, 134], 9));