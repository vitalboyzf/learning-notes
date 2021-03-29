const threeSum = function (numbers) {
    // 定义返回结果数组
    const ret = [];
    // 参数数组长度
    let length = numbers.length;
    // 排序
    if (length < 3) return ret;
    const nums = numbers.sort((a, b) => a - b);
    for (let i = 0; i < length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                ret.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right === nums[right - 1]]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return ret;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));