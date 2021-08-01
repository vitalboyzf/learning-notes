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