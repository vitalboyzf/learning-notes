package 算法刷题.回溯;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// https://leetcode-cn.com/problems/permutations-ii/
public class _47_全排列II {
    boolean[] vis;

    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        // 记录填完的位置
        vis = new boolean[nums.length];
        Arrays.sort(nums);
        dfs(res, path, nums);
        return res;
    }

    private void dfs(List<List<Integer>> res, List<Integer> path, int[] nums) {
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; ++i) {
            // 剪枝条件
            // 1.数组的当前位置已经用过了
            // 2.当前位置不为0，并且数组当前位置和上一个位置数字相等，并且上一个数字没用过
            // 保证了对于重复数的集合，一定是从左往右顺序填入的
            if (vis[i] || (i > 0 && nums[i] == nums[i - 1] && !vis[i - 1])) {
                continue;
            }
            path.add(nums[i]);
            // 标记当前位置已经填入
            vis[i] = true;
            // 填下一个位置
            dfs(res, path, nums);
            // 回溯 撤销标记
            vis[i] = false;
            // 删除最后一个位置
            path.remove(path.size() - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(new _47_全排列II().permuteUnique(new int[]{1, 1, 2}));
    }
}
