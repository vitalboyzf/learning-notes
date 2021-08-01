// https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/
const findLengthOfLCIS = function (nums) {
    let maxLen = 1;
    let curMax = 1;
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < nums[i + 1]) {
            curMax++;
            if (i === nums.length - 2) maxLen = Math.max(maxLen, curMax);
        } else {
            maxLen = Math.max(maxLen, curMax);
            curMax = 1;
        }
    }
    return maxLen;
};
console.log(findLengthOfLCIS([1, 3, 5, 4, 2, 3, 4, 5]));