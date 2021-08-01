/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
    if (nums.length <= 1) return nums.length;
    let fast = 1;
    let slow = 1;
    while (fast < nums.length) {
        if (nums[slow - 1] !== nums[fast]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
};
console.log(removeDuplicates([0, 0, 1, 1, 2, 2, 3, 3, 4]));
//                 s           f
// [0, 1, 2, 3, 4, 2, 3, 3, 4]