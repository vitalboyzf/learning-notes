const canJump = function (nums) {
    // k是从头可以跳跃的目标最远索引
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > k) return false;
        k = Math.max(k, i + nums[i]);
    }
    return true;
};
console.log(canJump([3, 2, 1, 0, 4]));