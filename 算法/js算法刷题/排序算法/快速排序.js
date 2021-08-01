// 时间复杂度：平均O(nlogn)，最坏O(n2)，实际上大多数情况下小于O(nlogn)
// 空间复杂度:O(logn)（递归调用消耗）
// 解法1
function quickSort(arr) {
    if (arr.length < 2) return arr;
    let middle = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < middle) {
            // 放到左边
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([middle], quickSort(right));
}
// 解法2
function quickSort1(arr) {
    function _quickSort(arr, start, end) {
        if (start >= end) return;
        let left = start;
        let right = end;
        let mid = arr[right];
        while (left < right) {
            while (left < right && arr[left] <= mid) left++;
            arr[right] = arr[left];
            while (left < right && arr[right] >= mid) right--;
            arr[left] = arr[right];
        }
        arr[left] = mid;
        _quickSort(arr, 0, left - 1);
        _quickSort(arr, left + 1, end);
    }
    return _quickSort(arr, 0, arr.length - 1);
}
let arr = [4, 8, 0, 1, 3, 2, 6, 7];
let res = quickSort(arr);
console.log(res);