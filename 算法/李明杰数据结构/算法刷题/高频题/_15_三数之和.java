package 算法刷题.高频题;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// https://leetcode-cn.com/problems/3sum/
public class _15_三数之和 {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ret = new ArrayList<>();
        if (nums.length < 3) return ret;
        // 排序
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            // 右边第一个元素作为l指针
            int l = i + 1;
            // 最后一个元素作为右指针
            int r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    ret.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    // 跳过相同的值
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++;
                    r--;
                } else if (sum < 0) {
                    // 偏小
                    l++;
                } else {
                    // 偏大
                    r--;
                }
            }
        }
        return ret;
    }

    public static void main(String[] args) {
        System.out.println(new _15_三数之和().threeSum(new int[]{-1, 0, 1, 2, -1, -4}));
    }
}
