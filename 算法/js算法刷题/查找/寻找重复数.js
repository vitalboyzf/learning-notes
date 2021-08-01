//          0  1  2  3  4
let nums = [1, 3, 4, 2, 2];
/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums) {
    let left = 1;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // 计算中间值
        let count = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] <= mid) count++;
        }
        if (count <= mid) {
            left = mid + 1;
        } else {
            right = mid;
        }
        // 左右指针重合，找到target
        if (left === right) {
            return left;
        }
    }
    return -1;
};
// 双指针法
const findDuplicate_point = function (nums) {
    let slow = 0;
    let fast = 0;
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    console.log(slow);
    let before = 0;
    let after = slow;
    while (before !== after) {
        before = nums[before];
        after = nums[after];
    }
    return before;
};
console.log(findDuplicate_point(nums));