package 算法刷题.动态规划;

import java.util.Arrays;

// https://leetcode-cn.com/problems/coin-change/
public class _322_找零钱 {
    private int min = Integer.MAX_VALUE;

    private int coinChange(int[] coins, int amount, int[] dp) {
        if (amount < 1) return Integer.MAX_VALUE;
        if (dp[amount] != 0) return dp[amount];
        for (int coin : coins) {
            min = Math.min(min, coinChange(coins, amount - coin, dp));
        }
        dp[amount] = min + 1;
        return dp[amount];
    }

    // 记忆优化
    private int coinChange(int[] coins, int amount) {
        if (amount < 1) return -1;
        int[] dp = new int[amount + 1];
        for (int coin : coins) {
            dp[coin] = 1;
        }
        return coinChange(coins, amount, dp);
    }

    // 动态规划 递推式
    public int coinChange2(int[] coins, int amount) {
        if (amount < 1 || coins == null || coins.length == 0) return -1;
        int[] dp = new int[amount + 1];
        // 从1推导到amount 所需硬币
        for (int i = 1; i <= amount; i++) {
            int min = Integer.MAX_VALUE;
            for (int face : coins) {
                if (i < face) continue;
                min = Math.min(min, dp[i - face]);
            }
            dp[i] = min + 1;
        }
        return dp[amount];
    }


    public static void main(String[] args) {
        System.out.println(new _322_找零钱().coinChange2(new int[]{25, 20, 5, 1}, 41));
    }
}
