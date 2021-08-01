/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
    if (amount < 1 || coins === null || coins.length === 0) return -1;
    if (amount === 0) return 0;
    let dp = new Array(amount + 1);
    dp.fill(0);
    // 从1推导到amount 所需硬币
    for (let i = 1; i <= amount; i++) {
        let min = Number.MAX_SAFE_INTEGER;
        coins.forEach(face => {
            if (i < face) return;
            // min是减去当前面额所需最少硬币
            min = Math.min(min, dp[i - face]);
        });

        dp[i] = min + 1;
    }
    console.log(dp);
    return dp[amount] === Number.MAX_SAFE_INTEGER + 1 ? -1 : dp[amount];
};
console.log(coinChange([2, 5, 10, 11], 1));