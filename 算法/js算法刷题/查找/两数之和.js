function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (map.has(num)) {
            return [map.get(num), i];
        } else {
            map.set(target - num, i);
        }
    }
}
const nums = [2, 11, 7, 15],
    target = 9;
console.log(twoSum(nums, target));