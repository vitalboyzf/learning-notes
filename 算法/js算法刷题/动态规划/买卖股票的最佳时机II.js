/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
    let sum = 0;
    let curIn = null,
        curOut = null;
    let i = 0;
    // 循环prices数组
    while (i < prices.length) {
        // 如果curIn === null 说明curIn没有被赋值，进入下面的代码找出curIn
        if (curIn === null) {
            // 如果sum === 0 (只有第一次才能进入这个循环)并且第二个元素大于第一个元素，说明是第一次进入这个循环
            if (i === 0 && (prices[0] < prices[1])) {
                curIn = prices[0];
                // 如果当前元素不等于0，并且当期元素小于或者等于左边元素，小于右边元素
            } else if (i !== 0 && prices[i] <= prices[i - 1] && prices[i] < prices[i + 1]) {
                curIn = prices[i];
                // 都不满足，i索引右移，跳出本次循环
            } else {
                i++;
                continue;
            }
        }
        // 股票增长 什么也不用做
        if (prices[i + 1] >= prices[i]) {
            // nothing
        } else {
            // 股票跌落 卖出，curIn置null
            curOut = prices[i];
            // sum加上本次获利
            sum += curOut - curIn;
            curIn = null;
        }
        i++;
    }
    return sum;
};