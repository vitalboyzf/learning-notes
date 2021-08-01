/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * @param {*} nums 数组
 * @param {*} begin 开始坐标
 * @param {*} end 结束坐标
 * @returns 最大连续数组元素和
 */
function maxSubArray(nums, begin, end) {
    if (!begin) begin = 0;
    if (!end) end = nums.length;
    if (end - begin < 2) return nums[begin];
    let mid = (begin + end) >> 1;
    // 左边第一个
    let sumLeft = 0;
    let maxLeft = nums[mid - 1];
    for (let i = mid - 1; i >= begin; i--) {
        sumLeft += nums[i];
        maxLeft = Math.max(maxLeft, sumLeft);
    }
    // 右边第一个
    let maxRight = nums[mid];
    let sumRight = 0;
    for (let i = mid; i < end; i++) {
        sumRight += nums[i];
        maxRight = Math.max(maxRight, sumRight);
    }
    return Math.max(maxLeft + maxRight, Math.max(maxSubArray(nums, begin, mid), maxSubArray(nums, mid, end)));
}
let res = maxSubArray([3, 5]);
console.log(res);