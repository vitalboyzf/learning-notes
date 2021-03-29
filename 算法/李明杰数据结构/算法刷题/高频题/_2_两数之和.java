package 算法刷题.高频题;

import java.util.Arrays;
import java.util.HashMap;

public class _2_两数之和 {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (map.get(nums[i]) != null) {
                return new int[]{map.get(nums[i]), i};
            }
            map.put(target - nums[i], i);
        }
        return null;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(new _2_两数之和().twoSum(new int[]{1, 5, 3, 2, 6, 7}, 9)));
    }
}
