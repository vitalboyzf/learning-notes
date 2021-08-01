// https://leetcode-cn.com/problems/merge-sorted-array/
const merge = function (nums1, m, nums2, n) {
    let cur = nums1.length - 1;
    let n1 = m - 1;
    let n2 = n - 1;
    while (n2 >= 0) {
        if (n1 >= 0 && nums1[n1] > nums2[n2]) {
            nums1[cur--] = nums1[n1--];
        } else {
            nums1[cur--] = nums2[n2--];
        }
    }
};
const nums1 = [1, 2, 3, 0, 0, 0],
    m = 3,
    nums2 = [2, 5, 6],
    n = 3;
merge(nums1, m, nums2, n);
console.log(nums1);