// https://leetcode-cn.com/problems/3sum/
const threeSum = function (numbers) {
    // 定义返回结果数组
    const ret = [];
    // 参数数组长度
    let length = numbers.length;
    // 排序
    if (length < 3) return ret;
    const nums = numbers.sort((a, b) => a - b);
    // [2,2,-4]
    for (let i = 0; i < length - 2; i++) {
        // 去重操作
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            // 找到了合适的
            if (sum === 0) {
                ret.push([nums[i], nums[left], nums[right]]);
                // 去重操作
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right === nums[right - 1]]) right--;
                // 因为是有序数组，left增加了，right就不可能再满足条件，则进行减少操作
                left++;
                right--;
            }
            // sum比较小
            else if (sum < 0) {
                left++;
            }
            // sum>0,sum较大
            else {
                right--;
            }
        }
    }
    return ret;
};
const nums = [-4, -1, -1, 0, 1, 2];
console.log(threeSum(nums));