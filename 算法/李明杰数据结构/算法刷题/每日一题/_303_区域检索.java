package 算法刷题.每日一题;

// https://leetcode-cn.com/problems/range-sum-query-immutable/submissions/
public class _303_区域检索 {
    private final int[] nums;

    public _303_区域检索(int[] nums) {
        this.nums = nums;
    }

    public int sumRange(int i, int j) {
        int sum = 0;
        for (int start = i; start <= j; start++) {
            sum += this.nums[start];
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println(new _303_区域检索(new int[]{-2, 0, 3, -5, 2, -1}).sumRange(0, 2));
    }
}
