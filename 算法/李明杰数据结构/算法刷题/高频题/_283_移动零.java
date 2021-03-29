package 算法刷题.高频题;

import java.util.Arrays;

public class _283_移动零 {
    public void moveZeroes(int[] nums) {
        if (nums == null) return;
        for (int i = 0, cur = 0; i < nums.length; i++) {
            if (nums[i] == 0) continue;
            if (cur != i) {
                nums[cur] = nums[i];
                nums[i] = 0;
            }
            cur++;
        }
        System.out.println(Arrays.toString(nums));
    }

    public static void main(String[] args) {
        new _283_移动零().moveZeroes(new int[]{2, 7, 0, 4, 0, 1, 8});
    }
}
