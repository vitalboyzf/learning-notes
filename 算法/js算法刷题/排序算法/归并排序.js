/**
 * 时间复杂度：O(nlogn)
 * 空间复杂度:O(n)
 */
// 合并两个数组
function merge(front, end) {
    const temp = [];
    // 如果两个数组都有值，进行循环
    while (front.length && end.length) {
        // 比较两个数组第一个值，将小值取出添加到temp中
        if (front[0] < end[0]) {
            temp.push(front.shift());
        } else {
            temp.push(end.shift());
        }
    }
    // 如果front有值，都追加到temp中
    while (front.length) {
        temp.push(front.shift());
    }
    // 如果end有值，追啊到temp中
    while (end.length) {
        temp.push(end.shift());
    }
    // 返回合并后数组
    return temp;
}

function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }
    const mid = Math.floor(array.length / 2);
    const front = array.slice(0, mid);
    const end = array.slice(mid);
    
    return merge(mergeSort(front), mergeSort(end));
}
console.log(mergeSort([2, 9, 7, 4, 6, 1, 8]));