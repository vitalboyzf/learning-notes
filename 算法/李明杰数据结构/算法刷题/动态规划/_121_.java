package 算法刷题.动态规划;

/*
 * 买卖股票的最佳时机
 * */
public class _121_ {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        // 记录买入最低价格
        int minPrice = prices[0];
        // 记录最大利润
        int maxProfit = 0;
        for (int i = 1; i < prices.length; i++) {
            // 如果比最低价低，更新最低价
            if (prices[i] < minPrice) {
                minPrice = prices[i];
                // 比最低价高，更新最大利润
            } else {
                maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            }
        }
        return maxProfit;
    }
}
