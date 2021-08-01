/**
 * parent = (i-1)/2
 * c1 = 2i + 1
 * c2 = 2i + 2
 */
/**       
 *       10
 *     4    3
 *   5   1 2
 */
const arr = [4, 10, 3, 5, 1, 2];

function heapify(arr, i, n) {
    let c1 = i * 2 + 1;
    let c2 = i * 2 + 2;
    let max = i;
    if (c1 < n && arr[c1] > arr[max]) {
        max = c1;
    }
    if (c2 < n && arr[c2] > arr[max]) {
        max = c2;
    }
    if (max !== i) {
        let temp = arr[max];
        arr[max] = arr[i];
        arr[i] = temp;
        // max是交换的节点交换前的位置
        heapify(arr, max, n);
    }
}
// 创建堆
function build_heap(arr) {
    let last_index = arr.length - 1;
    let parent = Math.floor((last_index - 1) / 2);
    for (let i = parent; i >= 0; i--) {
        heapify(arr, i, arr.length);
    }
}
// 堆排序
function heap_sort(arr) {
    build_heap(arr);
    for (let i = arr.length - 1; i >= 0; i--) {
        // 交换头尾
        let temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
        heapify(arr, 0, i);
    }
    return arr;
}
console.log(heap_sort([2, 8, 9, 4, 3, 6, 5]));