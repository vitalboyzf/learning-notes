package 算法刷题.每日一题;

// https://leetcode-cn.com/problems/max-consecutive-ones/
public class _485_最大连续1的个数 {
    public int findMaxConsecutiveOnes(int[] nums) {
        int maxSum = 0;
        int itemSum = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 1) {
                itemSum++;
            }
            // 遇到0或者到达最后一个元素
            if (nums[i] == 0 || i == nums.length - 1) {
                // 设置最大值，重置当前段落最大值
                maxSum = Math.max(maxSum, itemSum);
                itemSum = 0;
            }
        }
        return maxSum;
    }

    public static void main(String[] args) {
        System.out.println(new _485_最大连续1的个数().findMaxConsecutiveOnes(new int[]{1, 1, 0, 1, 1, 1}));
    }
}
