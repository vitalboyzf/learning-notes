package 算法刷题.回溯;


import java.util.ArrayList;
import java.util.List;

public class _47_全排列II_2 {
    public List<List<Integer>> permuteUnique(int[] nums) {
        if (nums == null) return null;
        List<List<Integer>> ret = new ArrayList<>();
        // 记录填完的位置
        if (nums.length == 0) return ret;
        dfs(0, nums, ret);
        return ret;
    }

    private void dfs(int idx, int[] nums, List<List<Integer>> ret) {
        if (idx == nums.length) {
            List<Integer> result = new ArrayList<>();
            for (int value : nums) {
                result.add(value);
            }
            ret.add(result);
            return;
        }
        for (int i = idx; i < nums.length; i++) {
            // 如果idx到i前一个有和i相等的值，continue
            if (isRepeat(nums, idx, i)) continue;
            // 交换数组idx和i位置的值
            swap(nums, idx, i);
            // 还原数组
            dfs(idx + 1, nums, ret);
            swap(nums, idx, i);
        }
    }

    private boolean isRepeat(int[] nums, int idx, int i) {
//        for (int j = idx; j < i; j++) {
//            if (nums[i] == nums[j]) return true;
//        }
        return idx != i && nums[idx] == nums[i];
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) {

        System.out.println(new _47_全排列II_2()
                .permuteUnique(new int[]{1, 1, 2}));
    }
}
