function rob(nums) {
    if (nums.length === 1) return nums[0];
    const dp = [];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        // 如果不偷当前屋子，当前的最大金额就是上一次偷完的最大值
        // 如果偷当前屋子，当前的最大金额就是上上次偷完的最大值加上当前偷得金额
        // 两种情况取最大值
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[dp.length - 1];
}