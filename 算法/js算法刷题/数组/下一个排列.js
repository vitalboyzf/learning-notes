// https://leetcode-cn.com/problems/next-permutation/
function reverse(nums, start, end) {
    while (start < end) {
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

function nextPermutation(nums) {
    let n = nums.length;
    let k = n - 2;
    while (nums[k] >= nums[k + 1]) k--;
    // 找到最后也没有找到，直接反转数组
    if (k === -1) {
        reverse(nums, 0, n - 1);
        return;
    }
    // 找到了合适的k
    // 找到k后面下一个最小的比自己大的
    let i = k + 2;
    while (i < n && nums[i] > nums[k]) {
        i++;
    }
    let temp = nums[k];
    nums[k] = nums[i - 1];
    nums[i - 1] = temp;

    // 反转排序后面的数组，双指针
    let start = k + 1;
    let end = n - 1;
    reverse(nums, start, end);
}
const nums = [1, 5, 6, 8, 7, 6, 2, 1];
nextPermutation(nums);
console.log(nums);