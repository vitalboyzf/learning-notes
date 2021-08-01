const maxProfit = function (prices) {
    let minPrice = prices[0];
    let max = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            max = Math.max(max, prices[i] - minPrice);
        }
    }
    return max;
};