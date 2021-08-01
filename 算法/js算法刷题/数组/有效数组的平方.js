// https://leetcode-cn.com/problems/squares-of-a-sorted-array/
const sortedSquares = function (nums) {
    let left = 0;
    let right = nums.length - 1;
    let cur = right;
    const ret = [];
    while (cur >= 0) {
        if (nums[left] ** 2 > nums[right] ** 2) {
            ret[cur--] = nums[left++] ** 2;
        } else {
            ret[cur--] = nums[right--] ** 2;
        }
    }
    return ret;
};
console.log(sortedSquares([-4, -1, 0, 3, 10]));