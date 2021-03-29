package 算法刷题.分治;

// https://leetcode-cn.com/problems/maximum-subarray/
public class _53_连续最大子序列 {
    // 分治法
    public int maxSubArray(int[] nums, int begin, int end) {
        if (end - begin < 2) return nums[begin];
        int mid = (begin + end) >> 1;
        // 左边第一个
        int sumLeft = 0;
        int maxLeft = nums[mid - 1];
        for (int i = mid - 1; i >= begin; i--) {
            sumLeft += nums[i];
            maxLeft = Math.max(maxLeft, sumLeft);
        }
        // 右边第一个
        int maxRight = nums[mid];
        int sumRight = 0;
        for (int i = mid; i < end; i++) {
            sumRight += nums[i];
            maxRight = Math.max(maxRight, sumRight);
        }
        return Math.max(maxLeft + maxRight, Math.max(maxSubArray(nums, begin, mid), maxSubArray(nums, mid, end)));
    }

    public int maxSubArray(int[] nums) {
        return maxSubArray(nums, 0, nums.length);
    }

    // 暴力法
    public int maxSubArray1(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int max = Integer.MIN_VALUE;
        for (int begin = 0; begin < nums.length; begin++) {
            int sum = 0;
            for (int end = begin; end < nums.length; end++) {
                sum += nums[end];
                max = Math.max(max, sum);
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(new _53_连续最大子序列().maxSubArray1(nums));
    }
}
