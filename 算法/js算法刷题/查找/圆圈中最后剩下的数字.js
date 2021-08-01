// https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/
/**
 * 反推法：
 * 最后剩下一个数字，索引位必定为0
 * 那么剩下的这个数字上一个索引位就是 补上m个位置，然后模上当时的数组大小  (0 + 3)/2 = 1;
 */
// n个数字，经过m个删一个

function lastRemaining(n, m) {
    let res = 0;
    // i是上一次的数组长度，推断出上一次被删除的索引位
    for (let i = 2; i <= n; i++) {
        res = (res + m) % i;
    }
    return res;
}
console.log(lastRemaining(10, 3));