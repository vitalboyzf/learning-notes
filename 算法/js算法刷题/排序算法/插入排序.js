// 时间复杂度：O(n2)
// 空间复杂度: O(1)

function insertSort(array) {
    for (let i = 1; i < array.length; i++) {
        let target = i;
        for (let j = i - 1; j >= 0; j--) {
            if (array[target] < array[j]) {
                // 交换
                [array[target], array[j]] = [array[j], array[target]];
                target = j;
            }
            // 到了合适的位置，跳出内层循环
            else {
                break;
            }
        }
    }
    return array;

}
const arr = [2, 6, 9, 1, 3, 7, 4];
console.log(insertSort(arr));