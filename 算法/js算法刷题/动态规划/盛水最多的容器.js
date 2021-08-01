// https://leetcode-cn.com/problems/container-with-most-water/
const maxArea = function (height) {
    if (height.length < 0) return 0;
    let water = 0;
    let left = 0,
        right = height.length - 1;
    while (left < right) {
        // 右边的柱子高
        if (height[left] < height[right]) {
            water = Math.max(water, (right - left) * height[left]);
            left++;
        } else {
            // 左边的柱子高
            water = Math.max(water, (right - left) * height[right]);
            right--;
        }
    }
    return water;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));