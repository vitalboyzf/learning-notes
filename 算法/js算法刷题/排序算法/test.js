// 归并排序
function threeSum(arr) {
    const ret = [];
    arr = arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length - 3; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        let left = i + 1;
        let right = arr.length - 1;
        while (left < right) {
            let curSum = arr[i] + arr[left] + arr[right];
            if (curSum === 0) {
                // 找到了
                ret.push([arr[i], arr[left], arr[right]]);
                while (arr[left] === arr[left + 1]) left++;
                while (arr[right] === arr[right - 1]) right--;
                left++;
                right--;
            } else if (curSum < 0) {
                // 比较小增加
                left++;
            } else {
                right--;
            }
        }
    }
    return ret;
}
// -4 1 2
const arr = [-2, 0, 0, 2, 2];
console.log(threeSum(arr));