package 算法刷题.每日一题;

import java.util.Arrays;

public class _561_数组拆分 {
    public int arrayPairSum(int[] nums) {
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));

        int ans = 0;
        for (int i = 0; i < nums.length; i += 2) {
            ans += nums[i];
        }
        return ans;
    }

    public static void main(String[] args) {
        System.out.println(new _561_数组拆分().arrayPairSum(new int[]{6, 2, 6, 5, 1, 2}));
    }
}
