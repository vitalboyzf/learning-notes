package 算法刷题.回溯;

import java.util.ArrayList;
import java.util.List;

public class _46_全排序_2 {
    public List<List<Integer>> permute(int[] nums) {
        if (nums == null) return null;
        List<List<Integer>> ret = new ArrayList<>();
        if (nums.length == 0) return ret;
        dfs(0, ret, nums);
        return ret;
    }

    private void dfs(int idx, List<List<Integer>> ret, int[] nums) {
        if (idx == nums.length) {
            List<Integer> path = new ArrayList<>();
            for (int value : nums) {
                path.add(value);
            }
            ret.add(path);
            return;
        }

        for (int i = idx; i < nums.length; i++) {
            swap(nums, idx, i);
            dfs(idx + 1, ret, nums);
            // 恢复数组
            swap(nums, idx, i);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) {
        System.out.println(new _46_全排序_2().permute(new int[]{1, 2, 3}));
    }
}
