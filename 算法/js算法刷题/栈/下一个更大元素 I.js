/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// nums1是nums2的子集
function nextGreaterElement(nums1, nums2) {
    const result = new Array(nums1.length).fill(0);
    // map key为当前位置，value表示对应的右边最大值
    const map = helper(nums2);
    for (let i = 0; i < nums1.length; i++) {
        result[i] = map[nums1[i]];
    }
    return result;
}

function helper(nums) {
    const map = {};
    const stack = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        // 如果栈不为空，并且当前值大于等于栈最后一个元素，弹栈，直到栈中最后一个元素大于当前元素或者栈为空
        while (stack.length > 0 && nums[i] >= stack[stack.length - 1]) {
            stack.pop();
        }
        // 如果当前栈有元素，说明存在比当前值大的元素，返回这个元素，否则返回1
        map[nums[i]] = stack.length === 0 ? -1 : stack[stack.length - 1];
        // 将当前值入栈
        stack.push(nums[i]);
    }
    return map;
}

const nums1 = [3, 4, 1, 2],
    nums2 = [1, 3, 4, 2];
let ret = nextGreaterElement(nums1, nums2);
console.log(ret);