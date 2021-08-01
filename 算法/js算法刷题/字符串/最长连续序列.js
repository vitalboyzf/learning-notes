// https://leetcode-cn.com/problems/longest-consecutive-sequence/
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
const longestConsecutive = function (nums) {
    if (nums.length === 0) return 0;
    let maxLen = 1;
    const set = new Set(nums);
    for (let i = 0; i < nums.length; i++) {
        if (!set.has(nums[i] - 1)) {
            let curMax = 1;
            let curNum = nums[i];
            while (set.has(curNum + 1)) {
                curNum++;
                curMax++;
            }
            maxLen = Math.max(maxLen, curMax);
        }
    }
    return maxLen;
};
let arr = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutive(arr));
console.log(arr);