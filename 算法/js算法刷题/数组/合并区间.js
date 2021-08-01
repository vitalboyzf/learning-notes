// https://leetcode-cn.com/problems/merge-intervals/
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
    let ret = [];
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < intervals.length; i++) {
        // 查看ret数组最后一个元素数组
        const pre = ret[ret.length - 1];
        // 不能进行合并
        if (i === 0 || intervals[i][0] > pre[1]) {
            ret.push(intervals[i]);
        } else {
            // 小于等于，可以进行合并,pre[1]设置为两个区间中最大的第二个元素
            pre[1] = Math.max(pre[1], intervals[i][1]);
        }
    }
    return ret;
};
const intervals = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18]
];
console.log(merge(intervals));