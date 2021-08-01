function swap(nums, l, r) {
    let temp = nums[l];
    nums[l] = nums[r];
    nums[r] = temp;
}

function sortColors(nums) {
    let left = 0,
        right = nums.length - 1,
        cur = 0;
    while (cur <= right) {
        if (nums[cur] === 0) {
            // 应该在最左边
            swap(nums, left, cur);
            left++;
            cur++;
        } else if (nums[cur] === 1) {
            cur++;
        } else if (nums[cur] === 2) {
            swap(nums, right, cur);
            right--;
        }
    }
}
const arr = [1, 0, 2];
sortColors(arr);
console.log(arr);