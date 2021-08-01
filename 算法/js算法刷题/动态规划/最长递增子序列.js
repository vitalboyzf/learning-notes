function subLength(nums) {
    const dp = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // 增加
                dp[i] = Math.max(dp[j] + 1, dp[i]);
            }
        }
    }
    return dp[dp.length - 1];
}
console.log(subLength([4, 5, 1, 6, 2, 9]));